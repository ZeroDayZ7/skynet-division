-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 18, 2025 at 06:32 PM
-- Server version: 5.7.24
-- PHP Version: 8.3.4

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
-- Table structure for table `citizen_projects`
--

CREATE TABLE `citizen_projects` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `budget` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `location` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `creator_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `upvotes` int(11) DEFAULT '0',
  `downvotes` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `citizen_project_comments`
--

CREATE TABLE `citizen_project_comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `citizen_project_votes`
--

CREATE TABLE `citizen_project_votes` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL,
  `vote_type` enum('up','down') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `document_types`
--

CREATE TABLE `document_types` (
  `id` tinyint(4) NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_postings`
--

CREATE TABLE `job_postings` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salary_min` decimal(10,2) DEFAULT NULL,
  `salary_max` decimal(10,2) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `requirements` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification_templates`
--

CREATE TABLE `notification_templates` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notification_templates`
--

INSERT INTO `notification_templates` (`id`, `title`, `message`, `type`, `created_at`) VALUES
(1, 'Nowe zamówienie', 'Otrzymałeś nowe zamówienie do realizacji.', 'info', '2025-04-16 10:14:25'),
(2, 'Błąd płatności', 'Nie udało się przetworzyć płatności użytkownika.', 'error', '2025-04-16 10:14:25'),
(3, 'Konto zaktualizowane', 'Twoje dane konta zostały pomyślnie zaktualizowane.', 'success', '2025-04-16 10:14:25'),
(4, 'Ostrzeżenie o bezpieczeństwie', 'Wykryto nietypową aktywność na Twoim koncie.', 'warning', '2025-04-16 10:14:25'),
(5, 'Nowa wiadomość', 'Masz nową wiadomość od administratora.', 'info', '2025-04-16 10:14:25');

-- --------------------------------------------------------

--
-- Table structure for table `sequelize_meta`
--

CREATE TABLE `sequelize_meta` (
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `sid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(11) UNSIGNED DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `userId`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('nsvCLtMCyi4y69xPJKSUYtoyO16TgBvg', NULL, '2025-04-19 19:30:16', '{\"cookie\":{\"originalMaxAge\":90000000,\"expires\":\"2025-04-19T19:30:15.504Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":77,\"points\":50,\"role\":\"admin\",\"notifications\":20}', '2025-04-18 18:28:53', '2025-04-18 18:30:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pin` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `points` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `activation_token` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permissions` json DEFAULT NULL,
  `login_count` int(10) UNSIGNED DEFAULT '0',
  `role` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userBlock` tinyint(1) NOT NULL DEFAULT '0',
  `loginAttempts` tinyint(4) NOT NULL DEFAULT '0',
  `lastLoginAttempt` datetime DEFAULT NULL,
  `lastLoginIp` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `pass`, `pin`, `points`, `activation_token`, `permissions`, `login_count`, `role`, `userBlock`, `loginAttempts`, `lastLoginAttempt`, `lastLoginIp`, `createdAt`, `updatedAt`) VALUES
(1, 'unknown0@example.com', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjEsInJvbGUiOiJhZG1pbiIsInVzZXIiOiJBRE1JTjExIiwiZXhwIjoxNzE1MjU0MTMwLCJpYXQiOjE3MTUyNTA1MzB9.gqTPgr9lPFxFaR2mq4QUB5adI9vDYYY9DRZw_mlr0zk', NULL, 1037, 'admin', 0, 0, NULL, NULL, '2025-04-08 17:58:25', '2025-04-18 17:15:47'),
(2, 'unknown1@example.com', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjIsInJvbGUiOiJhZG1pbjIiLCJ1c2VyIjoiQURNSU4xMTEiLCJleHAiOjE3MTUyMjAzOTUsImlhdCI6MTcxNTIxNjc5NX0.r1PzfBaJJSplfgoFyX4-YvAkFPqmovgUoA1cgv7CEfs', NULL, 18, 'admin2', 0, 0, NULL, NULL, '2025-04-08 17:58:25', '2025-04-18 17:42:00'),
(4, 'unknown2@example.com', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, 3, NULL, NULL, NULL, 'user', 0, 0, NULL, NULL, '2025-04-08 17:58:25', '2025-04-08 17:58:25'),
(71, 'hesidak940@bsomek.com', '$2b$10$nhksDTDiaqH/RMniHpx86ejMoq8SVvvNOCs427QQPAYQeSnMcRy8e', NULL, 0, NULL, NULL, 2, 'user', 0, 0, NULL, NULL, '2025-04-08 17:58:25', '2025-04-08 17:58:25'),
(77, 'yovasec567@fincainc.com', '$2b$10$Hw9clcQtRnjoOFO8yo69He0gFkxfNfnAlzIq1P8YlASAAShdc/CCO', NULL, 50, NULL, NULL, 1115, 'admin', 0, 0, NULL, '::1', '2025-04-08 17:58:25', '2025-04-18 18:30:16');

-- --------------------------------------------------------

--
-- Table structure for table `user_data`
--

CREATE TABLE `user_data` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
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
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `hire_date` date NOT NULL,
  `contract_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hourly_rate` decimal(10,2) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_eid_data`
--

CREATE TABLE `user_eid_data` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `document_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issue_date` date NOT NULL,
  `expiration_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_eid_data`
--

INSERT INTO `user_eid_data` (`id`, `user_id`, `document_number`, `issue_date`, `expiration_date`) VALUES
(1, 77, 'ABC123456', '2022-01-01', '2032-01-01');

-- --------------------------------------------------------

--
-- Table structure for table `user_notifications`
--

CREATE TABLE `user_notifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `notification_id` int(10) UNSIGNED NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_notifications`
--

INSERT INTO `user_notifications` (`id`, `user_id`, `notification_id`, `is_read`, `created_at`) VALUES
(1, 77, 1, 1, '2025-04-16 10:16:06'),
(2, 77, 2, 1, '2025-04-16 10:16:06'),
(3, 77, 3, 1, '2025-04-16 10:16:06'),
(4, 77, 4, 1, '2025-04-16 10:16:06'),
(5, 77, 5, 1, '2025-04-16 10:16:06'),
(6, 77, 1, 0, '2025-04-16 10:16:06'),
(7, 77, 2, 0, '2025-04-16 10:16:06'),
(8, 77, 3, 0, '2025-04-16 10:16:06'),
(9, 77, 2, 0, '2025-04-16 10:16:06'),
(10, 77, 5, 0, '2025-04-16 10:16:06'),
(11, 77, 1, 0, '2025-04-16 10:16:06'),
(12, 77, 2, 0, '2025-04-16 10:16:06'),
(13, 77, 3, 0, '2025-04-16 10:16:06'),
(14, 77, 4, 0, '2025-04-16 10:16:06'),
(15, 77, 5, 0, '2025-04-16 10:16:06'),
(16, 77, 1, 0, '2025-04-16 10:16:06'),
(17, 77, 1, 0, '2025-04-16 10:16:06'),
(18, 77, 1, 0, '2025-04-16 10:16:06'),
(19, 77, 1, 0, '2025-04-16 10:16:06'),
(20, 77, 1, 0, '2025-04-16 10:16:06'),
(21, 77, 1, 0, '2025-04-16 10:16:06'),
(22, 77, 1, 0, '2025-04-16 10:16:06'),
(23, 77, 1, 0, '2025-04-16 10:16:06'),
(24, 77, 1, 0, '2025-04-16 10:16:06'),
(25, 77, 1, 0, '2025-04-16 10:16:06');

-- --------------------------------------------------------

--
-- Table structure for table `user_passport_data`
--

CREATE TABLE `user_passport_data` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `passport_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issue_date` date NOT NULL,
  `expiration_date` date NOT NULL,
  `country_code` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'POL',
  `passport_type` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'P',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_passport_data`
--

INSERT INTO `user_passport_data` (`id`, `user_id`, `passport_number`, `issue_date`, `expiration_date`, `country_code`, `passport_type`, `createdAt`, `updatedAt`) VALUES
(1, 77, 'XA1234567', '2020-05-10', '2030-05-09', 'POL', 'P', '2025-04-05 12:36:51', '2025-04-05 12:36:51');

-- --------------------------------------------------------

--
-- Table structure for table `user_referrals`
--

CREATE TABLE `user_referrals` (
  `id` int(10) UNSIGNED NOT NULL,
  `referrer_id` int(10) UNSIGNED NOT NULL,
  `referred_user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
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
('98c068e3-f42a-4f46-8fcb-20c9b52a95b3', '3bd497373b74d3977f5b192bd217e4a7fa37a964ed5d80253b7f08236b887b7a', '2025-04-15 13:23:55.950', '20250415132353_add_expires_at_index', NULL, NULL, '2025-04-15 13:23:55.887', 1),
('ca024804-632e-4789-8ba3-6ac542aba049', '4213d8e89a8a7e5bdf0ae9d1ee5e6fbb96943e057a93afc9a08c70870287dee1', '2025-04-15 13:18:38.287', '20250415131836_init', NULL, NULL, '2025-04-15 13:18:36.845', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `citizen_projects`
--
ALTER TABLE `citizen_projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `citizen_projects_ibfk_1` (`creator_id`);

--
-- Indexes for table `citizen_project_comments`
--
ALTER TABLE `citizen_project_comments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `citizen_project_votes`
--
ALTER TABLE `citizen_project_votes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`project_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `document_types`
--
ALTER TABLE `document_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `job_postings`
--
ALTER TABLE `job_postings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ibfk_1` (`user_id`);

--
-- Indexes for table `notification_templates`
--
ALTER TABLE `notification_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `sequelize_meta`
--
ALTER TABLE `sequelize_meta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_sid_key` (`sid`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- Indexes for table `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_id` (`user_id`),
  ADD UNIQUE KEY `unique_pesel` (`pesel`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_eid_data`
--
ALTER TABLE `user_eid_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_id` (`user_id`),
  ADD UNIQUE KEY `unique_document_number` (`document_number`);

--
-- Indexes for table `user_notifications`
--
ALTER TABLE `user_notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notification_id` (`notification_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_passport_data`
--
ALTER TABLE `user_passport_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_id` (`user_id`),
  ADD UNIQUE KEY `unique_passport_number` (`passport_number`);

--
-- Indexes for table `user_referrals`
--
ALTER TABLE `user_referrals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_prisma_migrations`
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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `citizen_project_comments`
--
ALTER TABLE `citizen_project_comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `citizen_project_votes`
--
ALTER TABLE `citizen_project_votes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_postings`
--
ALTER TABLE `job_postings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification_templates`
--
ALTER TABLE `notification_templates`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `user_data`
--
ALTER TABLE `user_data`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_eid_data`
--
ALTER TABLE `user_eid_data`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_notifications`
--
ALTER TABLE `user_notifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `user_passport_data`
--
ALTER TABLE `user_passport_data`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
