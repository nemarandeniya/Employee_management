package lk.bitproject.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;
import org.springframework.web.bind.annotation.PutMapping;

@RestController // implemented mapping availeble for use
// add implemented mapping to servelet container for use

// define mapping for employee ui [/employee]
public class EmployeeController {

    // create variable employeedao
    @Autowired // inject employee dao instance into dao variable
    private EmployeeDao dao;

    @Autowired
    private EmployeeStatusDao daoStatus;

    @RequestMapping(value = "/employee")
    public ModelAndView empUI() {
        ModelAndView empView = new ModelAndView(); // for return ui
        empView.setViewName("employee - 5.html");
        return empView;
    }

    // define mapping for get all employee data [/employee/getall]
    // produce-->data return format
    // @requestMapping(value="/employee/alldata",produces='application.json',method=RequestMethod.GET)
    @GetMapping(value = "/employee/alldata", produces = "application/json")
    public List<Employee> allEmployeeData() {
        // return data
        return dao.findAll();// dao variable eka use krla find all function eka cll krla data ganima.
    }

    // @PostMapping
    // define post mapping for save employee record
    @PostMapping(value = "/employee")
    public String addEmployee(@RequestBody Employee employee) { // @RequestBodyrequest = body ekta attach krna object
                                                                // eka genna gnnwa
        // Authentication and Authorization

        // check duplicate nic
        Employee extEmployeeByNic = dao.getByNic(employee.getNic());
        if (extEmployeeByNic != null) {
            return "Save not Completed : Given NIC Allready exist...!";
            // return "Save not Completed : Given " + employee.getNic() + " already
            // exist...!";
        }

        // checK duplicate email
        Employee extEmployeeByEmail = dao.getByEmail(employee.getEmail());
        if (extEmployeeByEmail != null) {
            return "Save not Completed : Given Email Allready exist...!";
            // return "Save not Completed : Given " + employee.getEmail() + " already
            // exist...!";
        }

        try {
            // set auto generated value
            String nextNumber = dao.getNextEmployeeNumber();
            // employee.setEmpno("010");
            if (nextNumber == null) {
                employee.setEmpno("011");
            } else {
                employee.setEmpno(nextNumber);
            }

            dao.save(employee);// save employee object(insert given employee object --> run insert query)
            return "OK";
        } catch (Exception e) {
            return "Save not completed :" + e.getMessage();
        }
    }

    /*
     * @RequestMapping(value="/privilage")
     * public ModelAndView privilageUi(){
     * ModelAndView privilageView=new ModelAndView();
     * privilageView.setViewName("privilage.html");
     * return privilageView;
     * }
     */

    // delete mapping
    @DeleteMapping(value = "/employee")
    public String deleteEmployee(@RequestBody Employee employee) {

        // existing
        Employee extEmployee = dao.getReferenceById(employee.getId());
        if (extEmployee == null) {
            return "Delete not completed : Employee not exist";
        }

        try {

            // hard delete
            // dao.delete(employee);
            // dao.delete(dao.getReferenceById(employee.getId()));

            // soft delete
            EmployeeStatus deleteStatus = daoStatus.getReferenceById(3);
            extEmployee.setEmployeestatus_id(deleteStatus);
            dao.save(extEmployee);

            return "OK";
        } catch (Exception e) {
            return "Delete vot completed : " + e.getMessage();
        }
    }

    // putMapping
    @PutMapping(value = "/employee")
    public String updateEmployee(@RequestBody Employee employee) {
        // authentication and authorization

        // duplicate and existing
        // get existing employee object getReferencebyid function --> used employee PK
        Employee extEmployee = dao.getReferenceById(employee.getId());
        if (extEmployee == null) {
            return "Update not completed : Employee not available..!";
        }

        Employee extEmployeeByNic = dao.getByNic(employee.getNic());// create extEmployeeByNic variable and get exist
                                                                    // employee object by using frontend employee object
                                                                    // nic value,
                                                                    // then assign extemployyeeByNic variable
        if (extEmployeeByNic != null && extEmployeeByNic.getId() != employee.getId()) {
            return "Update Not Completed : change " + employee.getNic() + " allready exist..!";
        }

        Employee extEmployeeByEmail = dao.getByEmail(employee.getEmail());// create extEmployeeByNic variable and get
                                                                          // exist employee object by using frontend
                                                                          // employee object nic value,
        // then assign extemployyeeByNic variable
        if (extEmployeeByEmail != null && extEmployeeByEmail.getId() != employee.getId()) {
            return "Update Not Completed : change " + employee.getEmail() + " allready exist..!";
        }

        try {
            // set auto set value

            // operator
            dao.save(employee);

            // dependances

            return "OK";
        } catch (Exception e) {
            return "update not completed : " + e.getMessage();
        }
    }
}
