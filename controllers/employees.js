var employess = [];
var departments = [];
export const FindEmployees = (req, res) => {
  console.log(employess);
  res.json({ data: employess });
};

export const FindEmployeeByName = (req, res) => {
  console.log(employess);
  console.log(req.params.name);
  var mapedemployess = employess.filter(
    (empoloy) => empoloy.name.startsWith(req.params.name) === true
  );
  console.log(mapedemployess);
  res.json({ data: mapedemployess });
};

export const addEmployee = (req, res) => {
  const data = req.body;

  var maxindex = employess.length + 1;

  console.log(data.department);
  employess.push({
    id: maxindex,
    name: data.name,
    surname: data.surname,
    salary: data.salary,
    department: data.department,
  });
  res.json({ status: "success" });
};
export const addDepartment = (req, res) => {
  const data = req.body;
  console.log(data);
  var maxindex = departments.length + 1;
  departments.push({
    id: maxindex,
    miasto: data.miasto,
    kilometry: data.kilometry,
    datawyjazdu: data.datawyjazdu,
    employ_id: req.params.id,
  });
  console.log(departments);
  res.json({ status: "success" });
};

export const FindDepartmentsByEmployeeId = (req, res) => {
  var mapedDepartments = departments.filter(
    (department) => department.employ_id.toString() === req.params.id.toString()
  );
  console.log(mapedDepartments);
  res.json({ data: mapedDepartments });
};
