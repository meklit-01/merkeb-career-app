import dataset from "@/data/careers.json";
export const careers = dataset.careers;
export function getCareer(id) {
  return careers.find((career) => career.id === id);
}
export function getCategories() {
  return [...new Set(careers.map((career) => career.category))].sort();
}
