-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: Lip 28, 2025 at 12:10 PM
-- Wersja serwera: 8.0.43
-- Wersja PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `dbauth`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `citizen_projects`
--

CREATE TABLE `citizen_projects` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `budget` int UNSIGNED NOT NULL DEFAULT '0',
  `location` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `creator_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `upvotes` int DEFAULT '0',
  `downvotes` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `citizen_project_comments`
--

CREATE TABLE `citizen_project_comments` (
  `id` int UNSIGNED NOT NULL,
  `project_id` int UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `citizen_project_votes`
--

CREATE TABLE `citizen_project_votes` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `project_id` int UNSIGNED NOT NULL,
  `vote_type` enum('up','down') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `document_types`
--

CREATE TABLE `document_types` (
  `id` tinyint NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `job_postings`
--

CREATE TABLE `job_postings` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `salary_min` decimal(10,2) DEFAULT NULL,
  `salary_max` decimal(10,2) DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `requirements` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notification_templates`
--

CREATE TABLE `notification_templates` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `notification_templates`
--

INSERT INTO `notification_templates` (`id`, `title`, `message`, `type`, `createdAt`) VALUES
(1, 'Witaj w Dark Army!', 'Dziękujemy za rejestrację – otrzymujesz 50 pkt na start. Wymieniaj je na nagrody.', 'info', '2025-04-16 10:14:25'),
(2, 'Błąd płatności', 'Nie udało się przetworzyć płatności użytkownika.', 'error', '2025-04-16 10:14:25'),
(3, 'Konto zaktualizowane', 'Twoje dane konta zostały pomyślnie zaktualizowane.', 'success', '2025-04-16 10:14:25'),
(4, 'Ostrzeżenie o bezpieczeństwie', 'Wykryto nietypową aktywność na Twoim koncie.', 'warning', '2025-04-16 10:14:25'),
(5, 'Nowa wiadomość', 'Masz nową wiadomość od administratora.', 'info', '2025-04-16 10:14:25');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `permission_templates`
--

CREATE TABLE `permission_templates` (
  `id` int UNSIGNED NOT NULL,
  `key` varchar(100) NOT NULL,
  `description` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Zrzut danych tabeli `permission_templates`
--

INSERT INTO `permission_templates` (`id`, `key`, `description`, `createdAt`) VALUES
(1, 'userManagement', 'Zarządzanie użytkownikami', '2025-04-21 14:36:16'),
(2, 'viewLogs', 'Podgląd logów systemowych', '2025-04-21 14:36:16'),
(3, 'userCreate', 'Tworzenie nowych użytkowników', '2025-04-21 14:36:16'),
(4, 'userDelete', 'Usuwanie użytkowników', '2025-04-21 14:36:16'),
(5, 'userBlock', 'Blokowanie lub odblokowanie użytkowników', '2025-04-21 14:36:16'),
(6, 'userEdit', 'Edycja danych użytkownika', '2025-04-21 14:36:16'),
(7, 'userEditPermissions', 'Edycja uprawnień użytkownika', '2025-04-21 14:36:16'),
(8, 'supportMessages', 'Wiadomości', '2025-04-21 14:36:16');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sequelize_meta`
--

CREATE TABLE `sequelize_meta` (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `session`
--

CREATE TABLE `session` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `sid` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int UNSIGNED DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `sessions`
--

INSERT INTO `sessions` (`sid`, `userId`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('_5l2K2fgqkWDPFB8C1q69E3h3f4VHr5F', NULL, '2025-05-07 22:11:23', '{\"cookie\":{\"originalMaxAge\":90000000,\"expires\":\"2025-05-07T20:43:04.966Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":77,\"role\":\"root\",\"username\":\"white_rose\",\"hasDocumentsEnabled\":true}', '2025-05-06 19:43:04', '2025-05-06 21:11:23'),
('woapqv7GB3YOOP8_MDKTKPbeCqlnKqpO', NULL, '2025-05-07 18:09:15', '{\"cookie\":{\"originalMaxAge\":90000000,\"expires\":\"2025-05-07T18:09:04.035Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":77,\"role\":\"root\",\"username\":\"white_rose\"}', '2025-05-06 17:07:17', '2025-05-06 17:09:15');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `support_ticket`
--

CREATE TABLE `support_ticket` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `subject` varchar(30) DEFAULT NULL,
  `status` enum('new','in_progress','closed','open') DEFAULT 'new',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Zrzut danych tabeli `support_ticket`
--

INSERT INTO `support_ticket` (`id`, `user_id`, `subject`, `status`, `createdAt`, `updatedAt`) VALUES
(8, 93, 'bug', 'open', '2025-05-05 14:41:45', '2025-05-06 11:03:50'),
(9, 93, 'bug', 'closed', '2025-05-05 14:41:45', '2025-05-06 01:18:39'),
(10, 93, 'bug', 'new', '2025-05-05 14:41:45', '2025-05-06 01:19:19'),
(41, 93, 'bug', 'new', '2025-05-06 13:41:19', '2025-05-06 13:41:19'),
(42, 93, 'feature', 'open', '2025-05-06 13:41:19', '2025-05-06 13:41:19'),
(43, 93, 'bug', 'new', '2025-05-06 13:41:19', '2025-05-06 13:41:19'),
(44, 93, 'bug', 'new', '2025-05-06 13:41:19', '2025-05-06 13:41:19'),
(45, 93, 'bug', 'new', '2025-05-06 13:41:19', '2025-05-06 13:41:19'),
(46, 93, 'bug', 'closed', '2025-05-06 13:41:19', '2025-05-06 13:41:19'),
(47, 93, 'feature', 'closed', '2025-05-06 13:41:19', '2025-05-06 13:41:19'),
(48, 93, 'bug', 'new', '2025-05-06 13:41:19', '2025-05-06 13:41:19'),
(49, 93, 'bug', 'new', '2025-05-06 13:41:19', '2025-05-06 13:41:19'),
(50, 93, 'bug', 'new', '2025-05-06 13:41:19', '2025-05-06 13:41:19'),
(51, 93, 'bug', 'new', '2025-05-06 13:41:19', '2025-05-06 13:41:19'),
(52, 93, 'bug', 'new', '2025-05-06 13:41:19', '2025-05-06 13:41:19'),
(53, 93, 'bug', 'new', '2025-05-06 13:41:19', '2025-05-06 13:41:19'),
(54, 93, 'bug', 'new', '2025-05-06 13:41:19', '2025-05-06 13:41:19'),
(55, 93, 'bug', 'new', '2025-05-06 13:41:19', '2025-05-06 13:41:19'),
(56, 93, 'bug', 'new', '2025-05-06 13:41:19', '2025-05-06 13:41:19');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `support_ticket_messages`
--

CREATE TABLE `support_ticket_messages` (
  `id` int UNSIGNED NOT NULL,
  `ticket_id` int UNSIGNED NOT NULL,
  `sender_type` enum('user','support') NOT NULL,
  `sender_id` int UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Zrzut danych tabeli `support_ticket_messages`
--

INSERT INTO `support_ticket_messages` (`id`, `ticket_id`, `sender_type`, `sender_id`, `message`, `createdAt`) VALUES
(4, 8, 'user', 93, 'Zgłoszenie zostało zamknięte przez użytkownika Zgłoszenie zostało zamknięte przez użytkownika Zgłoszenie zostało zamknięte przez użytkownika Zgłoszenie zostało zamknięte przez użytkownika', '2025-05-05 14:41:45'),
(5, 8, 'support', 77, 'Zgłoszenie zostało zamknięte przez użytkownika Zgłoszenie zostało zamknięte przez użytkownika Zgłoszenie zostało zamknięte przez użytkownika Zgłoszenie zostało zamknięte przez użytkownika', '2025-05-05 14:44:14'),
(73, 8, 'user', 93, 'Zgłoszenie zamknięte przez użytkownika: już dałem rade', '2025-05-06 00:56:40'),
(74, 8, 'user', 93, 'Zgłoszenie zamknięte przez użytkownika: huj', '2025-05-06 00:58:36'),
(75, 9, 'user', 93, 'Zgłoszenie zamknięte przez użytkownika: 123', '2025-05-06 00:59:40'),
(76, 8, 'user', 93, '123', '2025-05-06 01:00:14'),
(77, 8, 'user', 93, 'Zgłoszenie zamknięte przez użytkownika: 123', '2025-05-06 01:03:38'),
(78, 9, 'user', 93, 'Zgłoszenie zamknięte przez użytkownika: 123', '2025-05-06 01:18:39'),
(79, 8, 'user', 93, 'Zgłoszenie zamknięte przez użytkownika: 111', '2025-05-06 01:19:19'),
(82, 8, 'user', 93, '12345', '2025-05-06 11:03:43'),
(83, 8, 'user', 93, 'Zgłoszenie zamknięte przez użytkownika: 123', '2025-05-06 11:03:50'),
(84, 53, 'user', 93, '123', '2025-05-06 14:55:43'),
(85, 56, 'user', 93, '123', '2025-05-06 15:15:47');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pin_hash` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_factor_enabled` tinyint DEFAULT NULL,
  `points` int UNSIGNED NOT NULL DEFAULT '0',
  `activation_token` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `documents` json DEFAULT NULL,
  `login_count` int UNSIGNED DEFAULT '0',
  `role` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userBlock` tinyint(1) NOT NULL DEFAULT '0',
  `loginAttempts` tinyint NOT NULL DEFAULT '0',
  `lastLoginAttempt` datetime DEFAULT NULL,
  `lastLoginIp` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `pass`, `pin_hash`, `two_factor_enabled`, `points`, `activation_token`, `documents`, `login_count`, `role`, `userBlock`, `loginAttempts`, `lastLoginAttempt`, `lastLoginIp`, `createdAt`, `updatedAt`) VALUES
(71, '', 'hesidak940@bsomek.com', '$2b$10$nhksDTDiaqH/RMniHpx86ejMoq8SVvvNOCs427QQPAYQeSnMcRy8e', NULL, NULL, 0, NULL, NULL, 4, NULL, 1, 0, NULL, '::1', '2025-04-08 17:58:25', '2025-04-23 19:19:23'),
(77, 'white_rose', 'yovasec567@fincainc.com', '$2b$10$Hw9clcQtRnjoOFO8yo69He0gFkxfNfnAlzIq1P8YlASAAShdc/CCO', '$2b$10$V/7WltFUv3IDzs/XCFpLvurO/3ePgyZxcaXR7Rbrg6CeQtP6P1z..', 0, 50, NULL, '{\"documents\": {\"eid\": true, \"passport\": false, \"driving_license\": true}, \"test_features\": {\"betaAccess\": true, \"newsletter\": false}}', 1262, 'root', 0, 0, NULL, '::1', '2025-04-08 17:58:25', '2025-07-28 11:37:26'),
(93, 'test_user', 'jan@example.com', '$2b$10$hiZkpGS7be4jrwQdLfegm.eAi7CgS0vEhfBITHTcWADiOtNhp4KTG', NULL, NULL, 50, NULL, NULL, 7, 'user', 0, 0, NULL, '::1', '2025-04-30 06:24:07', '2025-05-06 09:12:18');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_data`
--

CREATE TABLE `user_data` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `second_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pesel` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth_date` date NOT NULL,
  `birth_place` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nationality` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `user_data`
--

INSERT INTO `user_data` (`id`, `user_id`, `first_name`, `second_name`, `last_name`, `pesel`, `birth_date`, `birth_place`, `gender`, `nationality`) VALUES
(7, 77, 'Jan', 'Michał', 'Kowalski', '12345678901', '1990-01-01', 'Warszawa', 'M', 'Polska');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_details`
--

CREATE TABLE `user_details` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `hire_date` date NOT NULL,
  `contract_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hourly_rate` decimal(10,2) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_eid_data`
--

CREATE TABLE `user_eid_data` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `document_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `issue_date` date NOT NULL,
  `expiration_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `user_eid_data`
--

INSERT INTO `user_eid_data` (`id`, `user_id`, `document_number`, `issue_date`, `expiration_date`) VALUES
(1, 77, 'ABC123456', '2022-01-01', '2032-01-01');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_notifications`
--

CREATE TABLE `user_notifications` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `notification_id` int UNSIGNED NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `user_notifications`
--

INSERT INTO `user_notifications` (`id`, `user_id`, `notification_id`, `is_read`, `createdAt`) VALUES
(1, 77, 1, 1, '2025-04-16 10:16:06'),
(26, 90, 1, 1, '2025-04-28 09:58:35'),
(27, 90, 1, 1, '2025-04-28 09:58:35'),
(28, 90, 1, 1, '2025-04-28 09:58:35'),
(29, 90, 1, 1, '2025-04-28 09:58:35'),
(30, 90, 1, 1, '2025-04-28 09:58:35'),
(31, 90, 1, 1, '2025-04-28 09:58:35'),
(32, 90, 1, 1, '2025-04-28 09:58:35'),
(33, 90, 1, 1, '2025-04-28 09:58:35'),
(34, 90, 1, 1, '2025-04-28 09:58:35'),
(35, 90, 1, 1, '2025-04-28 09:58:35'),
(36, 90, 1, 1, '2025-04-28 09:58:35'),
(37, 90, 1, 1, '2025-04-28 09:58:35'),
(38, 90, 1, 1, '2025-04-28 09:58:35'),
(39, 90, 1, 1, '2025-04-28 09:58:35'),
(40, 90, 1, 1, '2025-04-28 09:58:35'),
(41, 90, 1, 1, '2025-04-28 09:58:35'),
(42, 90, 1, 1, '2025-04-28 09:58:35'),
(43, 90, 1, 1, '2025-04-28 09:58:35'),
(44, 90, 1, 1, '2025-04-28 09:58:35'),
(45, 90, 1, 1, '2025-04-28 09:58:35'),
(46, 90, 1, 1, '2025-04-28 09:58:35'),
(47, 90, 1, 1, '2025-04-28 09:58:35'),
(48, 91, 1, 0, '2025-04-29 19:10:16'),
(49, 92, 1, 0, '2025-04-29 21:23:03'),
(50, 93, 1, 1, '2025-04-30 06:48:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_passport_data`
--

CREATE TABLE `user_passport_data` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `passport_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `issue_date` date NOT NULL,
  `expiration_date` date NOT NULL,
  `country_code` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'POL',
  `passport_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'P',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `user_passport_data`
--

INSERT INTO `user_passport_data` (`id`, `user_id`, `passport_number`, `issue_date`, `expiration_date`, `country_code`, `passport_type`, `createdAt`, `updatedAt`) VALUES
(1, 77, 'XA1234567', '2020-05-10', '2030-05-09', 'POL', 'P', '2025-04-05 12:36:51', '2025-04-05 12:36:51');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_permission`
--

CREATE TABLE `user_permission` (
  `id` int UNSIGNED NOT NULL,
  `permission_id` int UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `is_visible` tinyint(1) DEFAULT '0',
  `is_enabled` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Zrzut danych tabeli `user_permission`
--

INSERT INTO `user_permission` (`id`, `permission_id`, `user_id`, `is_visible`, `is_enabled`) VALUES
(4, 1, 77, 1, 1),
(5, 2, 77, 1, 1),
(6, 3, 77, 1, 1),
(7, 4, 77, 1, 0),
(8, 5, 77, 1, 1),
(9, 6, 77, 1, 1),
(10, 7, 77, 1, 1),
(11, 8, 77, 1, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_referrals`
--

CREATE TABLE `user_referrals` (
  `id` int UNSIGNED NOT NULL,
  `referrer_id` int UNSIGNED NOT NULL,
  `referred_user_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_settings`
--

CREATE TABLE `user_settings` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `pin_hash` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_factor_enabled` tinyint(1) DEFAULT '0',
  `dark_mode` tinyint(1) NOT NULL DEFAULT '0',
  `biometric_enabled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `user_settings`
--

INSERT INTO `user_settings` (`id`, `user_id`, `pin_hash`, `two_factor_enabled`, `dark_mode`, `biometric_enabled`, `created_at`, `updated_at`) VALUES
(1, 77, '$2b$12$6e.42MV0FWNaayqDCghKP.YdlCvi5BEs/ZBuv/RHL95u.v.F8aN1q', 1, 0, 0, '2025-07-28 12:07:51', '2025-07-28 12:09:52');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('98c068e3-f42a-4f46-8fcb-20c9b52a95b3', '3bd497373b74d3977f5b192bd217e4a7fa37a964ed5d80253b7f08236b887b7a', '2025-04-15 13:23:55.950', '20250415132353_add_expires_at_index', NULL, NULL, '2025-04-15 13:23:55.887', 1),
('ca024804-632e-4789-8ba3-6ac542aba049', '4213d8e89a8a7e5bdf0ae9d1ee5e6fbb96943e057a93afc9a08c70870287dee1', '2025-04-15 13:18:38.287', '20250415131836_init', NULL, NULL, '2025-04-15 13:18:36.845', 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `citizen_projects`
--
ALTER TABLE `citizen_projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `citizen_projects_ibfk_1` (`creator_id`);

--
-- Indeksy dla tabeli `citizen_project_comments`
--
ALTER TABLE `citizen_project_comments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `citizen_project_votes`
--
ALTER TABLE `citizen_project_votes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`project_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indeksy dla tabeli `document_types`
--
ALTER TABLE `document_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeksy dla tabeli `job_postings`
--
ALTER TABLE `job_postings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ibfk_1` (`user_id`);

--
-- Indeksy dla tabeli `notification_templates`
--
ALTER TABLE `notification_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeksy dla tabeli `permission_templates`
--
ALTER TABLE `permission_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeksy dla tabeli `sequelize_meta`
--
ALTER TABLE `sequelize_meta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeksy dla tabeli `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_sid_key` (`sid`);

--
-- Indeksy dla tabeli `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indeksy dla tabeli `support_ticket`
--
ALTER TABLE `support_ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usrid` (`user_id`);

--
-- Indeksy dla tabeli `support_ticket_messages`
--
ALTER TABLE `support_ticket_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ops_1` (`ticket_id`),
  ADD KEY `ops_2` (`sender_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- Indeksy dla tabeli `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_id` (`user_id`),
  ADD UNIQUE KEY `unique_pesel` (`pesel`);

--
-- Indeksy dla tabeli `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `user_eid_data`
--
ALTER TABLE `user_eid_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_id` (`user_id`),
  ADD UNIQUE KEY `unique_document_number` (`document_number`);

--
-- Indeksy dla tabeli `user_notifications`
--
ALTER TABLE `user_notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notification_id` (`notification_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `user_passport_data`
--
ALTER TABLE `user_passport_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_id` (`user_id`),
  ADD UNIQUE KEY `unique_passport_number` (`passport_number`);

--
-- Indeksy dla tabeli `user_permission`
--
ALTER TABLE `user_permission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index` (`user_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indeksy dla tabeli `user_referrals`
--
ALTER TABLE `user_referrals`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `user_settings`
--
ALTER TABLE `user_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `citizen_projects`
--
ALTER TABLE `citizen_projects`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `citizen_project_comments`
--
ALTER TABLE `citizen_project_comments`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `citizen_project_votes`
--
ALTER TABLE `citizen_project_votes`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `job_postings`
--
ALTER TABLE `job_postings`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `notification_templates`
--
ALTER TABLE `notification_templates`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `permission_templates`
--
ALTER TABLE `permission_templates`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `support_ticket`
--
ALTER TABLE `support_ticket`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT dla tabeli `support_ticket_messages`
--
ALTER TABLE `support_ticket_messages`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT dla tabeli `user_data`
--
ALTER TABLE `user_data`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT dla tabeli `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `user_eid_data`
--
ALTER TABLE `user_eid_data`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `user_notifications`
--
ALTER TABLE `user_notifications`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT dla tabeli `user_passport_data`
--
ALTER TABLE `user_passport_data`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `user_permission`
--
ALTER TABLE `user_permission`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT dla tabeli `user_referrals`
--
ALTER TABLE `user_referrals`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `user_settings`
--
ALTER TABLE `user_settings`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `citizen_projects`
--
ALTER TABLE `citizen_projects`
  ADD CONSTRAINT `citizen_projects_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ograniczenia dla tabeli `citizen_project_comments`
--
ALTER TABLE `citizen_project_comments`
  ADD CONSTRAINT `citizen_project_comments_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `citizen_projects` (`id`) ON DELETE CASCADE;

--
-- Ograniczenia dla tabeli `job_postings`
--
ALTER TABLE `job_postings`
  ADD CONSTRAINT `ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ograniczenia dla tabeli `support_ticket`
--
ALTER TABLE `support_ticket`
  ADD CONSTRAINT `usrid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ograniczenia dla tabeli `support_ticket_messages`
--
ALTER TABLE `support_ticket_messages`
  ADD CONSTRAINT `ops_1` FOREIGN KEY (`ticket_id`) REFERENCES `support_ticket` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ops_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `user_eid_data`
--
ALTER TABLE `user_eid_data`
  ADD CONSTRAINT `bfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`);

--
-- Ograniczenia dla tabeli `user_notifications`
--
ALTER TABLE `user_notifications`
  ADD CONSTRAINT `user_notifications_ibfk_2` FOREIGN KEY (`notification_id`) REFERENCES `notification_templates` (`id`) ON DELETE CASCADE;

--
-- Ograniczenia dla tabeli `user_passport_data`
--
ALTER TABLE `user_passport_data`
  ADD CONSTRAINT `cfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`);

--
-- Ograniczenia dla tabeli `user_permission`
--
ALTER TABLE `user_permission`
  ADD CONSTRAINT `FK_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `permission_templates` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
