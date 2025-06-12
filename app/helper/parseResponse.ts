import { Car, CarResponse} from "../types/cars";

export function parseCarsRespnse(cars: CarResponse[]): Car[] {
  return cars.map((car) => {
    return {
      folderId: car.folder_id,
      markId: car.mark_id,
      price: car.price,
      availability:car.availability,
      color:car.color,
      metallic:car.metallic,
      ownersNumber:car.owners_number,
      run:car.run,
      state:car.state,
      wheel: car.wheel,
      year:car.year,
      images: [...car.images.image],

    };
  });
}
