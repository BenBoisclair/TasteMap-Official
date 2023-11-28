export default function convertTimeFormat(time: string): string {
  const timeElements = time.split(":");
  return `${timeElements[0]}:${timeElements[1]}`;
}
