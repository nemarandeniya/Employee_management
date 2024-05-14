package lk.bitproject.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
public class EmployeeStatusController {
    
    @Autowired
    private EmployeeStatusDao dao;

    @GetMapping
    public List<EmployeeStatus> getAllDataList(){
        return dao.findAll();
    }
}
