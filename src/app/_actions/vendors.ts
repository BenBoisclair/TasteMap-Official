"use server";
import { db } from "@/db";
import { informationItem, review, vendor } from "@/db/schema/schema";
import { auth } from "@clerk/nextjs";
import { asc, desc, eq, sql } from "drizzle-orm";

type getVendorsProps = {
  tag?: string;
  marketId?: string;
  query?: string;
};

export async function getVendors({
  tag: searchTag,
  marketId,
  query,
}: getVendorsProps) {
  try {
    const { userId } = auth();

    const allVendors = await db.query.vendor.findMany({
      where: marketId ? eq(vendor.marketId, marketId) : undefined,
      with: {
        market: {
          columns: {
            name: true,
          },
        },
        tags: {
          columns: {
            tagId: false,
            vendorId: false,
          },
          with: {
            tag: {
              columns: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
        userFavourites: {
          columns: {
            userExternalId: true,
          },
        },
      },
      orderBy: [desc(vendor.isVerified), asc(vendor.sequence)],
    });

    const filteredVendors = !!searchTag
      ? allVendors.filter((vendor) =>
          vendor?.tags.some(({ tag }) => tag.name === searchTag)
        )
      : allVendors;

    const vendorsWithReview = await Promise.all(
      filteredVendors.map(async (vendor) => {
        const aggregationQuery = await db
          .select({
            total: sql<number>`cast(count(${review.id}) as int)`,
            average: sql<number>`cast(avg(${review.rating}) as float)`,
          })
          .from(review)
          .where(eq(review.vendorReviewedID, vendor.id))
          .groupBy(review.vendorReviewedID);

        const ratings =
          aggregationQuery.length > 0 ? aggregationQuery[0] : null;

        const { userFavourites, ...otherVendorData } = vendor;

        const isFavourite = userFavourites.some(
          (favourite) => favourite.userExternalId === userId
        );

        return {
          ...vendor,
          ratings,
          tags: vendor?.tags.map(({ tag }) => tag),
          isFavourite: isFavourite,
          createdAt: vendor.createdAt ? vendor.createdAt.toISOString() : null,
        };
      })
    );
    const filteredVendorsWithReview = query
      ? vendorsWithReview.filter(
          (vendor) =>
            (vendor.name &&
              vendor.name.toLowerCase().includes(query.toLowerCase())) ||
            (vendor.about &&
              vendor.about.toLowerCase().includes(query.toLowerCase()))
        )
      : vendorsWithReview;
    return filteredVendorsWithReview;
  } catch (error) {
    console.log(error);
  }
}

export async function getVendor(vendorId: string) {
  const { userId } = auth();
  const oneVendor = await db.query.vendor.findFirst({
    where: eq(vendor.id, vendorId),
    with: {
      market: {
        columns: {
          name: true,
          id: true,
        },
      },
      tags: {
        columns: {
          tagId: false,
          vendorId: false,
        },
        with: {
          tag: {
            columns: {
              id: true,
              name: true,
              type: true,
            },
          },
        },
      },
      informationItems: {
        columns: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
          sequence: true,
        },
        orderBy: [asc(informationItem.sequence)],
      },
      paymentOptions: {
        columns: {
          vendorId: false,
          paymentOptionId: false,
        },
        with: {
          paymentOption: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
      media: {
        columns: {
          id: true,
          mediaUrl: true,
          type: true,
        },
      },
      userFavourites: {
        columns: {
          userExternalId: true,
        },
      },
    },
  });

  try {
    const { userFavourites, tags, paymentOptions, media, ...restOfData } =
      oneVendor!;

    const aggregationRatings = await db
      .select({
        total: sql<number>`cast(count(${review.id}) as int)`,
        average: sql<number>`cast(avg(${review.rating}) as float)`,
      })
      .from(review)
      .where(eq(review.vendorReviewedID, vendorId))
      .groupBy(review.vendorReviewedID);

    const ratings =
      aggregationRatings.length > 0 ? aggregationRatings[0] : null;

    const isFavourite = userFavourites.some(
      (favourite) => favourite.userExternalId === userId
    );

    return {
      ...restOfData,
      ratings,
      tags: tags.map(({ tag }) => tag) ?? [],
      paymentOptions:
        paymentOptions.map(({ paymentOption }) => paymentOption) ?? [],
      media: media.map((media) => media),
      isFavourite: isFavourite,
      createdAt: restOfData.createdAt
        ? restOfData.createdAt.toISOString()
        : null,
    };
  } catch (error) {
    console.log(error);
  }
}
