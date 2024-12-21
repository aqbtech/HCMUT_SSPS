package com.se.ssps_be.service.fakeAPI;

import com.se.ssps_be.dto.request.BuyPagesRequest;
import com.se.ssps_be.entity.Student;
import com.se.ssps_be.repo.StudentRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FakeAPI {
    @Autowired
    private final StudentRepo studentRepo;
    public String buyPages(String username, BuyPagesRequest request){
        Student student = studentRepo.findStudentByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));
        student.setRemainingBalance(student.getRemainingBalance() + request.getQuantity());
        try {
            studentRepo.save(student);
        }
        catch(IllegalArgumentException e){
            throw new IllegalArgumentException("Something went wrong");
        }
        return "Successful";
    }
}
