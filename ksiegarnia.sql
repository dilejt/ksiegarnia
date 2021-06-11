-- phpMyAdmin SQL Dump
-- version 5.0.4
--
-- Host: 127.0.0.1
-- Wersja serwera: 10.4.17-MariaDB
-- Wersja PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `ksiegarnia`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ksiazka`
--

CREATE TABLE `ksiazka` (
  `id` int(11) NOT NULL,
  `tytul` varchar(128) COLLATE utf8_polish_ci NOT NULL,
  `autor` varchar(128) COLLATE utf8_polish_ci NOT NULL,
  `img` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `ksiazka`
--

INSERT INTO `ksiazka` (`id`, `tytul`, `autor`, `img`) VALUES
(1, 'Lamamania', 'de Guibert Francoise', '/images/lamamania.jpg'),
(2, 'Wczoraj i jutro', 'Anna Paszkiewicz', '/images/wczoraj-i-jutro.jpg'),
(3, 'Sto porad dla zakochanych', 'Eva Susso', '/images/sto-porad-dla-zakochanych.jpg'),
(5, 'Gustaw. Opowieść o Holoubku', 'Zofia Turowska', '/images/gustaw.jpg'),
(6, 'Sen o okapi', 'Mariana Leky', '/images/sen-o-okapi.jpg');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `ksiazka`
--
ALTER TABLE `ksiazka`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `ksiazka`
--
ALTER TABLE `ksiazka`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=291;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
