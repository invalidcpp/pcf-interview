# Usage

## Test missing CLI arguments
### Displays error when user forgets to input an author
```console
npm run missing_args
```

## Test missing author
### Display error when author can't be found in the open library API
```console
npm run missing_author
```

## Test working instance
### Show working example
```console
npm run working
```

## Use case
### How to use the program yourself
```console
npm start "<author name>"
```

## Expected Results

  - ✅ A console application that retrieves data as specced above from the open library API
  - ✅ Suitable tests that demonstrate your application
  - ✅ Relevant error handling

# Notes

My next steps would probably be to implement some sort of express endpoint and return the data taken from the open library. Then display the data from the express endpoint on a webpage.