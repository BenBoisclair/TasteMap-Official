enum Weekday {
  Monday = 0,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

const dayToNumber = (day: string): number => {
  if (day in Weekday) {
    return Weekday[day as keyof typeof Weekday];
  }
  throw new Error("Invalid day of the week");
};

export default dayToNumber;
