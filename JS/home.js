let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) =>{
    if(site_properties.use_local_storage.match("true")){
        getEmployeePayrollDataFromStorage();
    } else getEmployeePayrollDataFromServer();
});

const getEmployeePayrollDataFromStorage = () => {
    employeePayrollList = localStorage.getItem('EmployeePayrollList') ?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();
}

const processEmployeePayrollDataResponse = () => {
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

const getEmployeePayrollDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true)
       .then(responseText => {
           employeePayrollList = JSON.parse(responseText);
           processEmployeePayrollDataResponse();
       })
       .catch(error => {
           console.log("GET Error Status: "+ JSON.stringify(error));
           employeePayrollList = [];
           processEmployeePayrollDataResponse();
       })
}

const createInnerHtml = () => {
    
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                       "<th>Salary</th><th>Start Date</th><th>Actions</th>";
     let innerHtml = `${headerHtml}`;
     if(employeePayrollList.length == 0) return;
     for (const empPayrollData of employeePayrollList){
        innerHtml =`${innerHtml}
        <tr>
         <td><img class="profile" alt="" src="${empPayrollData._profile}"></td>
         <td>${empPayrollData._name}</td>
         <td>${empPayrollData._gender}</td>
         <td>${getDeptHtml(empPayrollData._department)}</td>
         <td>${empPayrollData._salary}</td>
         <td>${stringifyDate(empPayrollData._startDate)}</td> 
         <td>
           <img id="${empPayrollData.id}" onclick="remove(this)" alt="delete"
              src="../assets/outline_remove_circle_black_24dp.png">
           <img id="${empPayrollData.id}" alt="edit" onclick="update(this)"
              src="../assets/outline_edit_black_24dp.png">
         </td>               
        </tr>
        `;
     }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList){
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const remove = (node) => {
    let empPayrollData = employeePayrollList.find(empData => empData.id == node.id);
    if(!empPayrollData) return;
    const index = employeePayrollList
                  .map(empData => empData.id)
                  .indexOf(empPayrollData.id);
    employeePayrollList.splice(index, 1);
    if(site_properties.use_local_storage.match("true")) {
    localStorage.setItem('EmployeePayrollList', JSON.stringify(employeePayrollList));
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
    window.location.replace(site_properties.home_page);
    } else {
        const deleteURL = site_properties.server_url + empPayrollData.id.toString();
        makeServiceCall("DELETE", deleteURL, false)
            .then(responseText => {
                createInnerHtml();
            })
            .catch(error => {
                console.log("DELETE Error Status: "+JSON.stringify(error));
            });
    }
}

const update = (node) => {
    let empPayrollData = employeePayrollList.find(empData => empData.id == node.id)
    if(!empPayrollData) return;
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData))
    window.location.replace(site_properties.add_emp_payroll_page);
}