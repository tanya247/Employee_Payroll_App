class EmployeePayRoll{

    constructor(...parms)
    {
        this.name = params[0];
        this.profile = params[1];
        this.gender = params[2];
        this.department = params[3];
        this.salary = params[4];
        this.date = params[5];
        this.notes = params[6];
    }

    getName()
    {
        return this.name;
    }
    set name(name) {
       this.name=name;
    }
    getProfile()
    {
        return this.profile;
    }
    setProfile(profile)
    {
        this.profile=profile;
    }
    getGender()
    {
        return this.gender;

    }
    setGender(gender)
    {
        this.gender=gender;
        
    }

    getDepart()
        {
        return this.department;
        }
    setDepart(department)
    {
        this.department=department;
    }
    getSalary()
    {
        return this.salary;
    }
    setSalary(salary)
    {
        this.salary=salary;

    }
    getDate()
    {
        return this.date;
    }
    setDate(date)
    {
        this.date=date;
    }
    getNotes()
    {
        return this.notes;
    }
    setNotes(notes)
    {
        this.notes = notes;
    }
}


const salary=document.querySelector('#salary');
const output=document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function(){
    output.textContent = salary.value;
});