import Users from '../routes/users/users.model';
import Locations from '../routes/locations/location.model';
import Books from '../routes/books/books.model';
import { UserRole } from './types';

// Initialize the database with base content
const seedDb = async (): Promise<void> => {
  let UserHolder, LocationHolder;
  const existingUsers = await Users.find({});
  const existingLocations = await Locations.find({});
  const existingBook = await Books.find({});

  if(!existingLocations.length) {
    console.log("Seeding default location");
    LocationHolder = await Locations.create([
      {
        name: "SuperLocation",
        removed: false
      },
    ]);
    console.log("Default Location created!");
  }

  if (!existingUsers.length) {
    console.log(`Seeding default user`);
    UserHolder = await Users.create([
      {
        username: 'super',
        password: 'super',
        role: UserRole.super,
      },
    ]);
    console.log(`Default user created`);
  }

  if(!existingBook.length){
    console.log("Seeding default book");
    await Books.create([
      {
        Title: "The Name of the Wind",
        Author: "Patrick Rothfuss",
        ISBN: "978-0-7564-0407-9",
        CheckedOut: true,
        Location: LocationHolder,
        User: UserHolder
      }
    ]);
    console.log(`Default user created`);
    console.log(await Books.findOne({Title: "The Name of the Wind"}));
  }
};

export default seedDb;
