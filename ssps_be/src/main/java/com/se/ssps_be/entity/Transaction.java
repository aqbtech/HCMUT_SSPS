package com.se.ssps_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Student student; // Sinh viên mua thêm trang in

    private Integer pagesPurchased; // Số trang mua thêm
    private Double amount; // Số tiền thanh toán
    private String paymentMethod; // Phương thức thanh toán (BKPay, etc.)

    private LocalDateTime transactionTime;
}
