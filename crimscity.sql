-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 02, 2025 at 06:19 AM
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
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `budget` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `location` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL,
  `creator_id` int(11) NOT NULL,
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
-- Table structure for table `citizen_project_comments`
--

CREATE TABLE `citizen_project_comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `citizen_project_votes`
--

CREATE TABLE `citizen_project_votes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `project_id` int(11) UNSIGNED NOT NULL,
  `vote_type` enum('up','down') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
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
-- Table structure for table `job_postings`
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
  `user_id` int(11) NOT NULL,
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
-- Table structure for table `sessions`
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
('b6aQwtFAoh2AWys9OsSx2z-LgOgH6Mc2', '2025-04-03 03:25:11', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-03T03:25:06.944Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":77}', '2025-04-02 03:25:07', '2025-04-02 03:25:11'),
('h4Xlm0ukWoRU8suvsDn8PxEwn9qYmIS_', '2025-04-03 03:05:14', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-03T03:05:14.129Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":77}', '2025-04-02 03:05:14', '2025-04-02 03:05:14'),
('wnu27EV6SDE2eG9k8fhky9BtA3T-QVH9', '2025-04-03 05:47:13', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-03T05:47:13.264Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":77}', '2025-04-02 05:47:13', '2025-04-02 05:47:13');

-- --------------------------------------------------------

--
-- Table structure for table `sessions_store`
--

CREATE TABLE `sessions_store` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sessions_store`
--

INSERT INTO `sessions_store` (`session_id`, `expires`, `data`) VALUES
('194rnBvY1ReLHlEVdeE5X6qbl1T3gDhG', 1743502799, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2025-04-01T10:19:59.350Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":false},\"userId\":77}'),
('EUEAt69nbgdMeohHb-tl6lZRpxRKvCDg', 1743500091, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2025-04-01T09:34:28.147Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":false},\"userId\":77}'),
('fbv4Be8RgZPnyA4QHwmCMW1VhoUCI1J5', 1743499818, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2025-04-01T09:29:59.514Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":false},\"userId\":77}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ids` int(11) NOT NULL,
  `email` varchar(88) COLLATE utf8_polish_ci DEFAULT NULL,
  `user` varchar(55) COLLATE utf8_polish_ci DEFAULT NULL,
  `pass` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `pin` int(11) DEFAULT NULL,
  `notifications` int(11) DEFAULT NULL,
  `activation_token` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `reset_password_token` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `login_date` datetime DEFAULT NULL,
  `registration_date` datetime DEFAULT NULL,
  `login_count` int(11) DEFAULT '0',
  `role` varchar(10) COLLATE utf8_polish_ci DEFAULT NULL,
  `userBlock` tinyint(1) NOT NULL DEFAULT '0',
  `loginAttempts` int(11) DEFAULT '0',
  `lastLoginAttempt` datetime DEFAULT NULL,
  `lastLoginIp` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ids`, `email`, `user`, `pass`, `pin`, `notifications`, `activation_token`, `reset_password_token`, `login_date`, `registration_date`, `login_count`, `role`, `userBlock`, `loginAttempts`, `lastLoginAttempt`, `lastLoginIp`) VALUES
(1, 'abc@abc.pl', 'ADMIN11', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', 777, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjEsInJvbGUiOiJhZG1pbiIsInVzZXIiOiJBRE1JTjExIiwiZXhwIjoxNzE1MjU0MTMwLCJpYXQiOjE3MTUyNTA1MzB9.gqTPgr9lPFxFaR2mq4QUB5adI9vDYYY9DRZw_mlr0zk', NULL, '2024-05-09 12:28:50', NULL, 1037, 'admin', 0, 0, NULL, NULL),
(2, NULL, 'ADMIN111', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjIsInJvbGUiOiJhZG1pbjIiLCJ1c2VyIjoiQURNSU4xMTEiLCJleHAiOjE3MTUyMjAzOTUsImlhdCI6MTcxNTIxNjc5NX0.r1PzfBaJJSplfgoFyX4-YvAkFPqmovgUoA1cgv7CEfs', NULL, '2024-05-09 03:06:35', NULL, 18, 'admin2', 0, 0, NULL, NULL),
(3, NULL, 'ADMIN1', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjMsInJvbGUiOm51bGwsInVzZXIiOiJBRE1JTjEiLCJleHAiOjE3MDcwMzc0NjIsImlhdCI6MTcwNzAzMzg2Mn0.qiupxDDsYKOXjhZwJOGir9yBYDQa8c1PNkwYbc2NfiQ', NULL, '2024-02-04 09:04:22', NULL, NULL, NULL, 0, 0, NULL, NULL),
(4, NULL, '01585', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL),
(71, 'hesidak940@bsomek.com', NULL, '$2b$10$nhksDTDiaqH/RMniHpx86ejMoq8SVvvNOCs427QQPAYQeSnMcRy8e', NULL, NULL, NULL, 'GCcbKl4MMUFETTG16LVgWmi26yhKYm5hrM491VaN1UQWBFA8zw5TKVOm1XJuFKPb', '2024-05-30 06:47:18', '2024-05-15 08:56:11', 2, NULL, 0, 0, NULL, NULL),
(77, 'yovasec567@fincainc.com', NULL, '$2b$10$Hw9clcQtRnjoOFO8yo69He0gFkxfNfnAlzIq1P8YlASAAShdc/CCO', NULL, NULL, NULL, NULL, '2025-04-02 05:47:13', '2024-05-17 17:40:34', 545, 'HA', 0, 0, '2024-09-04 18:00:29', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
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
-- Table structure for table `user_eid_data`
--

CREATE TABLE `user_eid_data` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `second_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `pesel` varchar(11) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `birth_place` varchar(255) DEFAULT NULL,
  `document_number` varchar(20) NOT NULL,
  `issue_date` date NOT NULL,
  `expiration_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_eid_data`
--

INSERT INTO `user_eid_data` (`id`, `user_id`, `first_name`, `second_name`, `last_name`, `pesel`, `birth_date`, `birth_place`, `document_number`, `issue_date`, `expiration_date`) VALUES
(1, 77, 'Jan', 'Michał', 'Kowalski', '90031312345', '1990-03-13', 'Katowice', 'ABC123456', '2022-01-01', '2032-01-01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `citizen_projects`
--
ALTER TABLE `citizen_projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `creator_id` (`creator_id`);

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
-- Indexes for table `job_postings`
--
ALTER TABLE `job_postings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `sessions_store`
--
ALTER TABLE `sessions_store`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ids`);

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
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `pesel` (`pesel`),
  ADD UNIQUE KEY `document_number` (`document_number`);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `citizen_project_votes`
--
ALTER TABLE `citizen_project_votes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_eid_data`
--
ALTER TABLE `user_eid_data`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `citizen_projects`
--
ALTER TABLE `citizen_projects`
  ADD CONSTRAINT `citizen_projects_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`ids`) ON DELETE CASCADE;

--
-- Constraints for table `citizen_project_comments`
--
ALTER TABLE `citizen_project_comments`
  ADD CONSTRAINT `citizen_project_comments_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `citizen_projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `citizen_project_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`ids`) ON DELETE CASCADE;

--
-- Constraints for table `citizen_project_votes`
--
ALTER TABLE `citizen_project_votes`
  ADD CONSTRAINT `citizen_project_votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ids`) ON DELETE CASCADE,
  ADD CONSTRAINT `citizen_project_votes_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `citizen_projects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `job_postings`
--
ALTER TABLE `job_postings`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`ids`) ON DELETE CASCADE;

--
-- Constraints for table `user_details`
--
ALTER TABLE `user_details`
  ADD CONSTRAINT `user_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ids`);

--
-- Constraints for table `user_eid_data`
--
ALTER TABLE `user_eid_data`
  ADD CONSTRAINT `user_eid_data_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ids`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
