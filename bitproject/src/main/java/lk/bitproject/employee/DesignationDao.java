package lk.bitproject.employee;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DesignationDao extends JpaRepository<Designation, Integer>{

    String findAll = null;
} 