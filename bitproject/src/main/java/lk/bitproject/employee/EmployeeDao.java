package lk.bitproject.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface EmployeeDao extends JpaRepository<Employee,Integer> {
    String findAll=null;

    //Query -->@Query()
    //1. native query   (native wla thiyena key word samaharak JPA wla na. eka nisa meka tma use krnne)
    //2. JPA Query --> default



    //create query for get employee by given nic value
    //JPA format
    @Query("select e from Employee e where e.nic=?1")// ?1 danne parameter 1 eka kiyanna
    public Employee getByNic(String nic);

    //create query for get next employee number
    //native format
    @Query(value = "SELECT lpad(max(e.empnum)+1 ,3,'0') FROM bitproject.employee as e;", nativeQuery = true)
    public String getNextEmployeeNumber();

    //create query for get employee by given email
    @Query("select e from Employee e where e.email=?1")
    public Employee getByEmail(String email);
} 
