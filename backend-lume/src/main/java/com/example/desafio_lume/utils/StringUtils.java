package com.example.desafio_lume.utils;

import com.example.desafio_lume.enums.SituacaoCadastro;

import java.util.Objects;

public class StringUtils {

    public static boolean isNullOrEmpty(String str) {
        return str == null || str.isEmpty();
    }

    public static boolean isNullOrEmpty(Object obj) {
        return obj == null || (obj instanceof String && ((String) obj).isEmpty());
    }

    public static boolean areStringsIguais(String str1, String str2) {
        return Objects.equals(str1, str2);
    }

    public static String normalizarString(String str) {
        if (isNullOrEmpty(str)) return null;
        String normalizada = str.trim().toLowerCase();
        return normalizada.replaceAll("\\p{Punct}", "");
    }

    public static boolean isSituacaoValida(SituacaoCadastro situacao) {
        return situacao == SituacaoCadastro.ATIVO || situacao == SituacaoCadastro.INATIVO;
    }
}
