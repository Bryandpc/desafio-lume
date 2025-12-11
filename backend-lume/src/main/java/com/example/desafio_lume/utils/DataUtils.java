package com.example.desafio_lume.utils;

import java.time.LocalDateTime;
import java.time.ZoneId;

public class DataUtils {

    public static LocalDateTime retornaDataAgora() {
        return LocalDateTime.now(ZoneId.of("America/Sao_Paulo"));
    }
}
