package com.se.ssps_be.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@NamedEntityGraphs({
        @NamedEntityGraph(name = "printjob", attributeNodes = {
                @NamedAttributeNode("student"),
                @NamedAttributeNode("printer")}
        )
})
public class PrintJob {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Student student; // Sinh viên thực hiện in

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "printer_id")
    private Printer printer; // Máy in thực hiện in

    private String fileName;
    private Integer totalPages;

    @Enumerated(EnumType.STRING)
    private PageSize paperSize;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    @Getter
    public enum PageSize{
        A1,A2,A3,A4
    }
}
