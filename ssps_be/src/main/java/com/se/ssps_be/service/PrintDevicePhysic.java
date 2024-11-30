package com.se.ssps_be.service;

import com.se.ssps_be.entity.PrintJob;
import com.se.ssps_be.entity.PrintState;

public interface PrintDevicePhysic {
	PrintState print(PrintJob printJob);
}
