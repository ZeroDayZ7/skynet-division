-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 15, 2025 at 11:35 AM
-- Wersja serwera: 5.7.24
-- Wersja PHP: 8.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crimscity`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `citizen_projects`
--

CREATE TABLE `citizen_projects` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `budget` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `location` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL,
  `creator_id` int(11) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `upvotes` int(11) DEFAULT '0',
  `downvotes` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `citizen_projects`
--

INSERT INTO `citizen_projects` (`id`, `title`, `description`, `budget`, `location`, `category`, `creator_id`, `created_at`, `updated_at`, `upvotes`, `downvotes`) VALUES
(1, 'Nowy park miejski nad Wisłą', 'Stworzenie terenu rekreacyjnego z ławkami, ścieżkami i placem zabaw', 250000, 'Warszawa', 'Zdrowie', 77, '2025-03-30 16:51:52', '2025-03-30 17:27:01', 120, 15),
(2, 'Remont chodników w dzielnicy Śródmieście', 'Wymiana zniszczonych płyt chodnikowych na bezpieczną nawierzchnię', 15000, 'Warszawa', 'Ekologia', 77, '2025-03-30 16:51:52', '2025-03-30 17:29:19', 85, 10),
(3, 'Darmowe warsztaty programowania dla młodzieży', 'Cykl spotkań wprowadzających w świat IT dla uczniów szkół średnich', 200000, 'Warszawa', 'Ekologia', 77, '2025-03-30 16:51:52', '2025-03-30 17:26:37', 150, 8),
(4, 'Stacja naprawy rowerów miejskich', 'Utworzenie samoobsługowego punktu z narzędziami do drobnych napraw', 55000, 'Opole', 'Ekologia', 77, '2025-03-30 16:51:52', '2025-03-30 17:27:07', 95, 12),
(5, 'Nasadzenia drzew wzdłuż ul. Centralnej', 'Posadzenie 50 nowych drzew liściastych wzdłuż ruchliwej ulicy', 100000, 'Katowice', 'Infrastruktura', 77, '2025-03-30 16:51:52', '2025-03-30 17:26:52', 110, 9);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `citizen_project_comments`
--

CREATE TABLE `citizen_project_comments` (
  `id` int(11) UNSIGNED NOT NULL,
  `project_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `citizen_project_votes`
--

CREATE TABLE `citizen_project_votes` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `project_id` int(11) UNSIGNED NOT NULL,
  `vote_type` enum('up','down') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `email`, `subject`, `message`, `created_at`) VALUES
(1, 'matrix_neo@o2.pl', 'general_inquiry', '12', '2024-05-29 16:12:58');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `document_types`
--

CREATE TABLE `document_types` (
  `id` tinyint(4) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `job_postings`
--

CREATE TABLE `job_postings` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `salary_min` decimal(10,2) DEFAULT NULL,
  `salary_max` decimal(10,2) DEFAULT NULL,
  `description` text NOT NULL,
  `requirements` text NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `job_postings`
--

INSERT INTO `job_postings` (`id`, `title`, `company`, `location`, `category`, `postal_code`, `salary_min`, `salary_max`, `description`, `requirements`, `user_id`, `created_at`) VALUES
(30, 'Junior Frontend Developer', 'TechCorp', 'Warszawa', 'IT', '00-001', 5000.00, 8000.00, 'Development of user interfaces for web applications.', 'Knowledge of HTML, CSS, JavaScript, and React.', 77, '2025-03-31 00:00:27'),
(31, 'Junior Frontend Developer', 'TechCorp', 'Warszawa', 'IT', '00-001', 5000.00, 8000.00, 'Development of user interfaces for web applications.', 'Knowledge of HTML, CSS, JavaScript, and React.', 77, '2025-03-31 00:00:39'),
(32, 'Junior Frontend Developer', 'TechCorp', 'Warszawa', 'IT', '00-001', 5000.00, 8000.00, 'Development of user interfaces for web applications.', 'Knowledge of HTML, CSS, JavaScript, and React.', 77, '2025-03-31 00:01:05'),
(33, 'Junior Frontend Developer', 'TechCorp', 'Warszawa', 'IT', '00-001', 5000.00, 8000.00, 'Development of user interfaces for web applications.', 'Knowledge of HTML, CSS, JavaScript, and React.', 77, '2025-03-31 00:03:23'),
(34, 'Junior Frontend Developer', 'TechCorp', 'Warszawa', 'IT', '00-001', 5000.00, 8000.00, 'Development of user interfaces for web applications.', 'Knowledge of HTML, CSS, JavaScript, and React.', 77, '2025-03-31 06:48:24');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notification_templates`
--

CREATE TABLE `notification_templates` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notification_templates`
--

INSERT INTO `notification_templates` (`id`, `title`, `message`, `type`, `created_at`) VALUES
(1, 'Pierwsze logowanie', 'Gratulacje! Otrzymałeś 50 punktów na start.', 'bonus', '2025-04-03 16:07:07'),
(2, 'Nowa funkcja', 'Sprawdź nową funkcję w aplikacji – powiadomienia na żywo!', 'info', '2025-04-03 16:07:07'),
(3, 'Zmiana regulaminu', 'Regulamin został zaktualizowany, prosimy o zapoznanie się.', 'warning', '2025-04-03 16:07:07'),
(4, 'Nowa oferta pracy', 'Dostępne nowe oferty pracy w Twojej okolicy.', 'job', '2025-04-03 16:07:07'),
(5, 'Bezpieczeństwo konta', 'Zalecamy zmianę hasła co 90 dni dla większego bezpieczeństwa.', 'security', '2025-04-03 16:07:07'),
(6, 'Nowa wiadomość', 'Otrzymałeś nową wiadomość od użytkownika.', 'message', '2025-04-03 16:07:07'),
(7, 'Promocja', 'Zdobądź 10% rabatu na kolejne zakupy w naszym markecie.', 'promo', '2025-04-03 16:07:07'),
(8, 'Systemowa aktualizacja', 'Aplikacja została zaktualizowana do najnowszej wersji.', 'update', '2025-04-03 16:07:07'),
(9, 'Weryfikacja tożsamości', 'Twoja tożsamość została pomyślnie zweryfikowana.', 'verification', '2025-04-03 16:07:07'),
(10, 'Powiadomienie o płatności', 'Twoja płatność za subskrypcję została przetworzona.', 'payment', '2025-04-03 16:07:07');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sequelize_meta`
--

CREATE TABLE `sequelize_meta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelize_meta`
--

INSERT INTO `sequelize_meta` (`name`) VALUES
('20250408173313-add-timestamps-to-users.js');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('-eDx9R1lCMRzeIAOMl4FY1khvDx2nWqn', '2025-04-15 21:10:13', '{\"cookie\":{\"originalMaxAge\":90000000,\"expires\":\"2025-04-15T14:02:19.467Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":77,\"csrfToken\":\"c8b99b4a-3522-4079-81d1-b42ea3769ac4\",\"points\":50,\"role\":\"admin\",\"notifications\":3}', '2025-04-14 13:02:19', '2025-04-14 20:10:13'),
('SopakNEsvaKJlA7gobpRq9aNcqLuy5xF', '2025-04-16 12:32:34', '{\"cookie\":{\"originalMaxAge\":90000000,\"expires\":\"2025-04-16T12:32:34.281Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"},\"userId\":77,\"csrfToken\":\"48788ac6-a8cd-40e8-8257-4f1aa0c3107d\",\"points\":50,\"role\":\"admin\",\"notifications\":3}', '2025-04-15 11:32:34', '2025-04-15 11:32:34');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pin` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `points` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `activation_token` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `login_count` int(11) UNSIGNED DEFAULT '0',
  `role` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userBlock` tinyint(1) NOT NULL DEFAULT '0',
  `loginAttempts` tinyint(11) NOT NULL DEFAULT '0',
  `lastLoginAttempt` datetime DEFAULT NULL,
  `lastLoginIp` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `pass`, `pin`, `points`, `activation_token`, `login_count`, `role`, `userBlock`, `loginAttempts`, `lastLoginAttempt`, `lastLoginIp`, `createdAt`, `updatedAt`) VALUES
(1, 'unknown0@example.com', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjEsInJvbGUiOiJhZG1pbiIsInVzZXIiOiJBRE1JTjExIiwiZXhwIjoxNzE1MjU0MTMwLCJpYXQiOjE3MTUyNTA1MzB9.gqTPgr9lPFxFaR2mq4QUB5adI9vDYYY9DRZw_mlr0zk', 1037, 'admin', 0, 0, NULL, NULL, '2025-04-08 17:58:25', '2025-04-08 17:58:25'),
(2, 'unknown1@example.com', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjIsInJvbGUiOiJhZG1pbjIiLCJ1c2VyIjoiQURNSU4xMTEiLCJleHAiOjE3MTUyMjAzOTUsImlhdCI6MTcxNTIxNjc5NX0.r1PzfBaJJSplfgoFyX4-YvAkFPqmovgUoA1cgv7CEfs', 18, 'admin2', 0, 0, NULL, NULL, '2025-04-08 17:58:25', '2025-04-08 17:58:25'),
(4, 'unknown2@example.com', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, 3, NULL, NULL, 'user', 0, 0, NULL, NULL, '2025-04-08 17:58:25', '2025-04-08 17:58:25'),
(71, 'hesidak940@bsomek.com', '$2b$10$nhksDTDiaqH/RMniHpx86ejMoq8SVvvNOCs427QQPAYQeSnMcRy8e', NULL, 0, NULL, 2, 'user', 0, 0, NULL, NULL, '2025-04-08 17:58:25', '2025-04-08 17:58:25'),
(77, 'yovasec567@fincainc.com', '$2b$10$Hw9clcQtRnjoOFO8yo69He0gFkxfNfnAlzIq1P8YlASAAShdc/CCO', '$2b$10$6kVtZOtXnWhYJRjkdyDGFe3RZ9K0SHQ1.CA6KWp1gr5JO7iBiy5/G', 50, NULL, 1036, 'admin', 0, 0, NULL, '::1', '2025-04-08 17:58:25', '2025-04-15 11:32:34');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_data`
--

CREATE TABLE `user_data` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `second_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pesel` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth_date` date NOT NULL,
  `birth_place` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nationality` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_data`
--

INSERT INTO `user_data` (`id`, `user_id`, `first_name`, `second_name`, `last_name`, `pesel`, `birth_date`, `birth_place`, `gender`, `nationality`) VALUES
(7, 77, 'Jan', 'Michał', 'Kowalski', '12345678901', '1990-01-01', 'Warszawa', 'M', 'Polska');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_details`
--

CREATE TABLE `user_details` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `hire_date` date NOT NULL,
  `contract_type` varchar(50) NOT NULL,
  `hourly_rate` decimal(10,2) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isActive` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `user_id`, `hire_date`, `contract_type`, `hourly_rate`, `salary`, `created_at`, `updated_at`, `isActive`) VALUES
(1, 77, '2024-09-09', 'Full-time', 20.00, 4000.00, '2024-09-09 10:27:58', '2024-09-09 16:29:50', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_eid_data`
--

CREATE TABLE `user_eid_data` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `document_number` varchar(20) NOT NULL,
  `issue_date` date NOT NULL,
  `expiration_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_eid_data`
--

INSERT INTO `user_eid_data` (`id`, `user_id`, `document_number`, `issue_date`, `expiration_date`) VALUES
(1, 77, 'ABC123456', '2022-01-01', '2032-01-01');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_notifications`
--

CREATE TABLE `user_notifications` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `notification_id` int(11) UNSIGNED NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `received_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_notifications`
--

INSERT INTO `user_notifications` (`id`, `user_id`, `notification_id`, `is_read`, `received_at`) VALUES
(1, 77, 1, 0, '2025-04-03 17:01:17'),
(2, 77, 2, 0, '2025-04-03 17:01:17'),
(3, 77, 3, 0, '2025-04-03 17:01:17'),
(4, 77, 4, 1, '2025-04-03 17:01:17'),
(5, 77, 5, 1, '2025-04-03 17:01:17'),
(6, 77, 6, 1, '2025-04-03 17:01:17'),
(7, 77, 7, 1, '2025-04-03 17:01:17'),
(8, 77, 8, 1, '2025-04-03 17:01:17'),
(9, 77, 9, 1, '2025-04-03 17:01:17');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_passport_data`
--

CREATE TABLE `user_passport_data` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `passport_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issue_date` date NOT NULL,
  `expiration_date` date NOT NULL,
  `country_code` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'POL',
  `passport_type` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'P',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_passport_data`
--

INSERT INTO `user_passport_data` (`id`, `user_id`, `passport_number`, `issue_date`, `expiration_date`, `country_code`, `passport_type`, `createdAt`, `updatedAt`) VALUES
(1, 77, 'XA1234567', '2020-05-10', '2030-05-09', 'POL', 'P', '2025-04-05 12:36:51', '2025-04-05 12:36:51');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_referrals`
--

CREATE TABLE `user_referrals` (
  `id` int(10) UNSIGNED NOT NULL,
  `referrer_id` int(10) UNSIGNED NOT NULL COMMENT 'ID osoby, która rejestruje',
  `referred_user_id` int(10) UNSIGNED NOT NULL COMMENT 'ID osoby zarejestrowanej',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Data rejestracji'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabela przechowuje informacje o relacjach rejestracji użytko';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('616f9fe5-49fd-4774-a595-1c9279864d19', '52ee04ff0f1b1adc2fad91f4870b604adbade4c6e543c4f6e5582825ab1025de', '2025-04-15 08:21:34.002', '0_init', '', NULL, '2025-04-15 08:21:34.002', 0);

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
-- Indeksy dla tabeli `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

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
-- Indeksy dla tabeli `sequelize_meta`
--
ALTER TABLE `sequelize_meta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeksy dla tabeli `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

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
  ADD UNIQUE KEY `unique_user_id` (`user_id`) USING BTREE,
  ADD UNIQUE KEY `unique_pesel` (`pesel`) USING BTREE;

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
  ADD UNIQUE KEY `unique_user_id` (`user_id`) USING BTREE,
  ADD UNIQUE KEY `unique_document_number` (`document_number`) USING BTREE;

--
-- Indeksy dla tabeli `user_notifications`
--
ALTER TABLE `user_notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `notification_id` (`notification_id`);

--
-- Indeksy dla tabeli `user_passport_data`
--
ALTER TABLE `user_passport_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_passport_number` (`passport_number`),
  ADD UNIQUE KEY `unique_user_id` (`user_id`);

--
-- Indeksy dla tabeli `user_referrals`
--
ALTER TABLE `user_referrals`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `citizen_projects`
--
ALTER TABLE `citizen_projects`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `citizen_project_comments`
--
ALTER TABLE `citizen_project_comments`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `citizen_project_votes`
--
ALTER TABLE `citizen_project_votes`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `job_postings`
--
ALTER TABLE `job_postings`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `notification_templates`
--
ALTER TABLE `notification_templates`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `user_data`
--
ALTER TABLE `user_data`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_eid_data`
--
ALTER TABLE `user_eid_data`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_notifications`
--
ALTER TABLE `user_notifications`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user_passport_data`
--
ALTER TABLE `user_passport_data`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_referrals`
--
ALTER TABLE `user_referrals`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `citizen_projects`
--
ALTER TABLE `citizen_projects`
  ADD CONSTRAINT `citizen_projects_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `citizen_project_comments`
--
ALTER TABLE `citizen_project_comments`
  ADD CONSTRAINT `citizen_project_comments_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `citizen_projects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `job_postings`
--
ALTER TABLE `job_postings`
  ADD CONSTRAINT `ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_eid_data`
--
ALTER TABLE `user_eid_data`
  ADD CONSTRAINT `bfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`);

--
-- Constraints for table `user_notifications`
--
ALTER TABLE `user_notifications`
  ADD CONSTRAINT `user_notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_notifications_ibfk_2` FOREIGN KEY (`notification_id`) REFERENCES `notification_templates` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_passport_data`
--
ALTER TABLE `user_passport_data`
  ADD CONSTRAINT `cfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
