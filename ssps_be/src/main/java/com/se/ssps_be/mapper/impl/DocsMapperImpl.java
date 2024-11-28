package com.se.ssps_be.mapper.impl;

import com.se.ssps_be.dto.DocsEle;
import com.se.ssps_be.entity.Document;
import com.se.ssps_be.mapper.DocsMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DocsMapperImpl implements DocsMapper {
	@Override
	public DocsEle toDocsEle(Document document) {
		DocsEle docsEle = new DocsEle();
		docsEle.setId(document.getId());
		docsEle.setName(document.getName());
		return docsEle;
	}

	@Override
	public Page<DocsEle> toDocsElePage(Page<Document> documentPage) {
		return documentPage.map(this::toDocsEle);
	}
}
