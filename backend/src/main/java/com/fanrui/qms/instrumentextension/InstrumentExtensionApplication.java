package com.fanrui.qms.instrumentextension;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.Clock;

@SpringBootApplication
public class InstrumentExtensionApplication {
    public static void main(String[] args) {
        SpringApplication.run(InstrumentExtensionApplication.class, args);
    }

    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }
}
