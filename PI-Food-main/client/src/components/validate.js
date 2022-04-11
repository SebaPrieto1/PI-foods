export default function validate(input) {
  let error = {};
  if (input.hasOwnProperty("name")) {
    if (!input.name.length) error.name = "Recipes must have a name";
  }
  if (input.hasOwnProperty("summary")) {
    if (!input.summary.length) error.summary = "Recipes must have a summary";
  }
  if (input.hasOwnProperty("score")) {
    let test = Number(input.score);
    if (isNaN(test))
      error.score = "Input must be a numeric value between 1 and 100";
    else if (test > 100 || test < 1)
      error.score = "Only numbers between 1 and 100";
  }
  if (input.hasOwnProperty("healthScore")) {
    let test = Number(input.healthScore);
    if (isNaN(test))
      error.healthScore = "Input must be a numeric value between 1 and 100";
    else if (test > 100 || test < 1)
      error.healthScore = "Only numbers between 1 and 100";
  }
  if (input.image) {
    var urlPattern =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if (!urlPattern.test(input.image)) error.image = "Invalid URL";
  }
  return error;
}
