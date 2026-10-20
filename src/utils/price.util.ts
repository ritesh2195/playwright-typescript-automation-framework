/**
 * Extracts a numeric price from the provided text.
 * @param stringContainingPrice - The text containing the price to extract.
 * @returns The extracted price as a number.
 */
export function extractPrice(stringContainingPrice:string){
    return stringContainingPrice.match(/\d+/)?.[0]
}