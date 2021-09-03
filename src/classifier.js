/**
 * This is the entry point to the program
 * Question 1 - Classifier
 *
 * @param {any} input Array of student objects
 */

const input = [
  {
    name: 'Hendrick',
    dob: '1853-07-18T00:00:00.000Z',
    regNo: '041',
  },
  {
    name: 'Albert',
    dob: '1879-03-14T00:00:00.000Z',
    regNo: '033',
  },
  {
    name: 'Marie',
    dob: '1867-11-07T00:00:00.000Z',
    regNo: '024',
  },
  {
    name: 'Neils',
    dob: '1885-10-07T00:00:00.000Z',
    regNo: '02',
  },
  {
    name: 'Max',
    dob: '1858-04-23T00:00:00.000Z',
    regNo: '014',
  },
  {
    name: 'Erwin',
    dob: '1887-08-12T00:00:00.000Z',
    regNo: '09',
  },
  {
    name: 'Auguste',
    dob: '1884-01-28T00:00:00.000Z',
    regNo: '08',
  },
  {
    name: 'Karl',
    dob: '1901-12-05T00:00:00.000Z',
    regNo: '120',
  },
  {
    name: 'Louis',
    dob: '1892-08-15T00:00:00.000Z',
    regNo: '022',
  },
  {
    name: 'Arthur',
    dob: '1892-09-10T00:00:00.000Z',
    regNo: '321',
  },
  {
    name: 'Paul',
    dob: '1902-08-08T00:00:00.000Z',
    regNo: '055',
  },
  {
    name: 'William',
    dob: '1890-03-31T00:00:00.000Z',
    regNo: '013',
  },
  {
    name: 'Owen',
    dob: '1879-04-26T00:00:00.000Z',
    regNo: '052',
  },
  {
    name: 'Martin',
    dob: '1871-02-15T00:00:00.000Z',
    regNo: '063',
  },
  {
    name: 'Guye',
    dob: '1866-10-15T00:00:00.000Z',
    regNo: '084',
  },
  {
    name: 'Charles',
    dob: '1868-02-14T00:00:00.000Z',
    regNo: '091',
  },
];

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
    console.log(ages);
    minorGroup['oldest'] = ages[ages.length - 1];
    minorGroup['sum'] = ages.reduce((total, age) => total + age);
    let nos = group.map((user) => Number(user.regNo)).sort((a, b) => a - b);
    minorGroup['regNos'] = nos;
    return element;
  }, {});

  return compiler;
}
console.log(classifier(input));
module.exports = classifier;
