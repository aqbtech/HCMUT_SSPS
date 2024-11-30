package com.se.ssps_be.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Converter
public class PaperSizeConverter implements AttributeConverter<List<PaperSize>, String> {

	@Override
	public String convertToDatabaseColumn(List<PaperSize> paperSizes) {
		// Join the enums' names with a comma
		return paperSizes == null || paperSizes.isEmpty()
				? null
				: paperSizes.stream()
				.map(PaperSize::name)
				.collect(Collectors.joining(","));
	}

	@Override
	public List<PaperSize> convertToEntityAttribute(String dbData) {
		// Split the comma-separated string into a list of enums
		return dbData == null || dbData.isEmpty()
				? List.of()
				: Arrays.stream(dbData.split(","))
				.map(PaperSize::valueOf)
				.collect(Collectors.toList());
	}
}
