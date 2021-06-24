import fetch from 'node-fetch';

type openLibraryReturnData = {
  Authors: string[];
  Title: string;
  BookURL: string;
  CoverURL: string;
};

class OpenLibrarySearch {
  author: string;

  constructor(args: string[]) {
    this.author = args.slice(2)[0]; // get user input from console

    if (this.author == undefined) {
      // if no cli argument inputted
      throw '[ERROR]: Missing CLI arguments. Example: npm start <author>'; // throw error
    }
  }

  async search(): Promise<openLibraryReturnData[]> {
    return fetch(`http://openlibrary.org/search.json?author=${this.author}`) // fetch API data
      .then((res) => res.json()) // return data as json
      .then((json) => {
        // handle json data
        let data = json.docs.slice(0, 20); // cut off at 20 objects
        if (data.length == 0) {
          throw '[ERROR]: Author not found';
        }
        let result: openLibraryReturnData[] = []; // define results array
        for (var i = 0; i < data.length; i++) {
          // loop over data
          let newData = {
            // create a new object with wanted data
            Authors: data[i].author_name,
            Title: data[i].isbn[0],
            BookURL: 'http://openlibrary.org/isbn/' + data[i].isbn[0],
            CoverURL:
              'CoverURL: http://covers.openlibrary.org/b/isbn/' + data[i].isbn[0] + '-L.jpg',
          };
          result.push(newData); // push to results array
        }
        return result; // return the results
      });
  }
}

const mergeDedupe = (arr) => {
  return [...new Set([].concat(...arr))]; // concats all arrays with no duplicities
};
try {
  const librarySearch = new OpenLibrarySearch(process.argv); // create new OpenLibrarySearch with command line arguments

  librarySearch
    .search()
    .then((data) => {
      let authorsArray: Array<Array<string>> = []; // Define array that holds arrays, that holds strings
      for (let i = 0; i < data.length; i++) {
        // loop over all data
        authorsArray.push(data[i].Authors); // push authors array to array, array (man thats a lot of arrays)
        // Print to console wanted data
        console.log('Authors: ' + data[i].Authors);
        console.log('Title: ' + data[i].Title);
        console.log('BookURL: ' + data[i].BookURL);
        console.log('CoverURL: ' + data[i].CoverURL);
        console.log('\n');
      }

      console.log('List of all authors: ' + mergeDedupe(authorsArray)); // merge all authors with no duplicities
      console.log(
        "\n[Note]: Some Cover URL's have no image on them. This is because the book doesn't have a cover.",
      );
    })
    .catch((err) => {
      // handle error
      console.log(err);
    });
} catch (err) {
  // handle error
  console.log(err);
}
