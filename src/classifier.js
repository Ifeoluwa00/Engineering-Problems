/**
 * This is the entry point to the program
 * Question 1 - Classifier
 *
 * @param {any} input Array of student objects
 */
function classifier(input) {
  if (input.length === 0) {
    return {
      noOfGroups: 0,
    };
  }

  let personnel = input
    .map((user) => {
      user['age'] =
        new Date(Date.now()).getFullYear() -
        new Date(user['dob']).getFullYear();
      return user;
    })
    .sort((a, b) => a.age - b.age);

  let majorClass = [];
  let minorClass = [];
  for (let index = 0; index < personnel.length; index++) {
    if (minorClass.length === 0) {
      minorClass.push(personnel[index]);
    } else if (personnel[index].age - minorClass[0].age <= 5) {
      minorClass.push(personnel[index]);
    } else if (personnel[index].age - minorClass[0].age > 5) {
      majorClass.push(minorClass);
      minorClass = [];
      minorClass.push(personnel[index]);
    }

    if (minorClass.length === 3 || index + 1 >= personnel.length) {
      majorClass.push(minorClass);
      minorClass = [];
    }
  }

  let compiler = majorClass.reduce((element, group, index) => {
    element['noOfGroups'] = majorClass.length;
    element[`group${index + 1}`] = {};
    let minorGroup = element[`group${index + 1}`];
    minorGroup['members'] = group;
    let ages = group.map((user) => user.age);
    minorGroup['oldest'] = ages[ages.length - 1];
    minorGroup['sum'] = ages.reduce((total, age) => total + age);
    let nos = group.map((user) => Number(user.regNo)).sort((a, b) => a - b);
    minorGroup['regNos'] = nos;
    return element;
  }, {});

  return compiler;
}

module.exports = classifier;
