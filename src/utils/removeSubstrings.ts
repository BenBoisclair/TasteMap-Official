export default function removeSubstrings(mainString: string): string {
  const substringsToRemove = [
    "Floating Market",
    "Night Market",
    "Creative Park",
    "Center Market",
  ];

  let cleanedString = mainString;
  // Iterate over each substring to remove.
  substringsToRemove.forEach((substring) => {
    // Replace the current substring with an empty string.
    cleanedString = cleanedString.replace(substring, "").trim();
  });
  return cleanedString;
}

// Usage
// const originalString = "Taling Chan Floating Market";
// const substringsToRemove = ["Floating Market", "Night Market"]; // Add more as needed
// const result = removeSubstrings(originalString, substringsToRemove);
// console.log(result); // Outputs: "Taling Chan"
