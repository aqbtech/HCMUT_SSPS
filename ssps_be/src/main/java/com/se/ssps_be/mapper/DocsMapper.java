package com.se.ssps_be.mapper;

import com.se.ssps_be.dto.DocsEle;
import com.se.ssps_be.entity.Document;
import org.springframework.data.domain.Page;

public interface DocsMapper {
	DocsEle toDocsEle(Document document);
	Page<DocsEle> toDocsElePage(Page<Document> documentPage);
}
