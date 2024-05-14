package lk.bitproject.employee;

import java.time.LocalDate;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity  //convvert into entity class
@Table(name = "employee") //mapping with employee table
@Data//genarate setter and getter and toString
@NoArgsConstructor  //default constructor
@AllArgsConstructor //all argument constructor
public class Employee {


    @Id //integrate primery key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  //set Auto Increment
    @Column(name="id",unique = true) //map with id column and set as uique
    private Integer id;

    @Column(name="empnum",unique = true,length=8)
    @NotNull                       //cannot be null
    private String empno;              

    @Column(name="fullname")
    @NotNull                       //cannot be null
    private String fullname;          

    @Column(name="callingname")
    @NotNull                       //cannot be null
    private String callingname;       

    @Column(name="nic",unique = true,length = 8)
    @Length(max = 12,min = 10,message = "value length between 10-12")
    @NotNull                       //cannot be null
    private String nic;               

    @Column(name="gender")
    @NotNull                       //cannot be null
    private String gender;            

    @Column(name="dob")
    @NotNull                       //cannot be null
    private LocalDate dob;

    @Column(name="mobile",length = 10)
    private String mobile;            

    @Column(name="landno",length = 10)                     //cannot be null
    private String landno;            

    @Column(name="address")
    @NotNull                       //cannot be null
    private String address; 

    @Column(name="civilstatus")
    @NotNull                       //cannot be null
    private String civilstatus;      

    @Column(name="note")                     //cannot be null
    private String note;

    @Column(name="email")
    @NotNull                       //cannot be null
    private String email; 

   
    @ManyToOne   //relationship format    
    @JoinColumn(name="designation_id",referencedColumnName = "id")   //join column
    private Designation designation_id;

    @ManyToOne   //relationship format
    @JoinColumn(name="employee_status_id",referencedColumnName = "id")     //join column
    private EmployeeStatus employeestatus_id;

    public void setEmployeestatus_id() {
    }

}
