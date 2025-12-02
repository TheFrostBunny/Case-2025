/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: treningssenter
-- ------------------------------------------------------
-- Server version	12.1.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `ansatte`
--

DROP TABLE IF EXISTS `ansatte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ansatte` (
  `AnsattID` int(11) NOT NULL AUTO_INCREMENT,
  `Navn` varchar(100) NOT NULL,
  `Rolle` enum('Trener','Administrator','Rengjøringspersonell') NOT NULL,
  `Telefon` varchar(15) DEFAULT NULL,
  `Epost` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`AnsattID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ansatte`
--

LOCK TABLES `ansatte` WRITE;
/*!40000 ALTER TABLE `ansatte` DISABLE KEYS */;
/*!40000 ALTER TABLE `ansatte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `betalinger`
--

DROP TABLE IF EXISTS `betalinger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `betalinger` (
  `BetalingID` int(11) NOT NULL AUTO_INCREMENT,
  `Kundenummer` int(11) DEFAULT NULL,
  `Beløp` decimal(10,2) NOT NULL,
  `Betalingsdato` date NOT NULL,
  PRIMARY KEY (`BetalingID`),
  KEY `Kundenummer` (`Kundenummer`),
  CONSTRAINT `1` FOREIGN KEY (`Kundenummer`) REFERENCES `kunder` (`Kundenummer`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `betalinger`
--

LOCK TABLES `betalinger` WRITE;
/*!40000 ALTER TABLE `betalinger` DISABLE KEYS */;
INSERT INTO `betalinger` VALUES
(1,1,299.00,'2025-11-28');
/*!40000 ALTER TABLE `betalinger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kunde_program`
--

DROP TABLE IF EXISTS `kunde_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `kunde_program` (
  `KundeProgramID` int(11) NOT NULL AUTO_INCREMENT,
  `Kundenummer` int(11) DEFAULT NULL,
  `ProgramID` int(11) DEFAULT NULL,
  `StartDato` date DEFAULT NULL,
  PRIMARY KEY (`KundeProgramID`),
  KEY `Kundenummer` (`Kundenummer`),
  KEY `ProgramID` (`ProgramID`),
  CONSTRAINT `1` FOREIGN KEY (`Kundenummer`) REFERENCES `kunder` (`Kundenummer`),
  CONSTRAINT `2` FOREIGN KEY (`ProgramID`) REFERENCES `treningsprogrammer` (`ProgramID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kunde_program`
--

LOCK TABLES `kunde_program` WRITE;
/*!40000 ALTER TABLE `kunde_program` DISABLE KEYS */;
INSERT INTO `kunde_program` VALUES
(1,1,1,'2025-11-28'),
(2,1,1,'2025-11-28');
/*!40000 ALTER TABLE `kunde_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kundefeedback`
--

DROP TABLE IF EXISTS `kundefeedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `kundefeedback` (
  `FeedbackID` int(11) NOT NULL AUTO_INCREMENT,
  `Kundenummer` int(11) DEFAULT NULL,
  `Tilbakemelding` text DEFAULT NULL,
  `Dato` date NOT NULL,
  PRIMARY KEY (`FeedbackID`),
  KEY `Kundenummer` (`Kundenummer`),
  CONSTRAINT `1` FOREIGN KEY (`Kundenummer`) REFERENCES `kunder` (`Kundenummer`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kundefeedback`
--

LOCK TABLES `kundefeedback` WRITE;
/*!40000 ALTER TABLE `kundefeedback` DISABLE KEYS */;
INSERT INTO `kundefeedback` VALUES
(2,1,'Veldig bra!','2025-11-28');
/*!40000 ALTER TABLE `kundefeedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kunder`
--

DROP TABLE IF EXISTS `kunder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `kunder` (
  `Kundenummer` int(11) NOT NULL AUTO_INCREMENT,
  `Navn` varchar(100) NOT NULL,
  `Epost` varchar(100) NOT NULL,
  `Telefon` varchar(15) DEFAULT NULL,
  `MedlemskapID` int(11) NOT NULL,
  `Utløpsdato` date NOT NULL,
  `Passord` varchar(255) NOT NULL,
  `HarTreningstimer` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`Kundenummer`),
  KEY `MedlemskapID` (`MedlemskapID`),
  CONSTRAINT `1` FOREIGN KEY (`MedlemskapID`) REFERENCES `medlemskap` (`MedlemskapID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kunder`
--

LOCK TABLES `kunder` WRITE;
/*!40000 ALTER TABLE `kunder` DISABLE KEYS */;
INSERT INTO `kunder` VALUES
(1,'Testkunde','test@epost.no','12345678',1,'2025-12-31','$2a$10$KdZ9NNdXx47DEd9MYrkzNuf62nqcp3s0bxQVpfviqxozDJ9Qhdc8a',0),
(9,'David','thesleepybunny@proton.me','84839957',1,'2026-02-20','$2a$10$kBC9wwy3aGU7tlpRRNAp1e0fnFImFd7tsaldPJuO8CxFEDeJAPgX6',0),
(10,'elin','thesleepybunny@gmail.com','843002348',1,'2026-02-20','$2a$10$FudQXxPf6RP3P7YR5nwkB.vKmxiuRc735XCrg.fz3BpHt.elmbUH6',0),
(14,'Bob','thesleepybunny@test.no','85949382',1,'2026-02-20','$2a$10$JExfusiQlRx.pQZhn8af6u6s/6XFLDCmQm0gvV4Ut5Uuq7RQqaL3W',1);
/*!40000 ALTER TABLE `kunder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medlemskap`
--

DROP TABLE IF EXISTS `medlemskap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `medlemskap` (
  `MedlemskapID` int(11) NOT NULL AUTO_INCREMENT,
  `TypeMedlemskap` enum('Standard','Premium','Familie','Student') NOT NULL,
  `Pris` decimal(10,2) NOT NULL,
  PRIMARY KEY (`MedlemskapID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medlemskap`
--

LOCK TABLES `medlemskap` WRITE;
/*!40000 ALTER TABLE `medlemskap` DISABLE KEYS */;
INSERT INTO `medlemskap` VALUES
(1,'Standard',299.00),
(2,'Premium',500.00),
(3,'Familie',800.00),
(4,'Student',199.00);
/*!40000 ALTER TABLE `medlemskap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treningsprogrammer`
--

DROP TABLE IF EXISTS `treningsprogrammer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `treningsprogrammer` (
  `ProgramID` int(11) NOT NULL AUTO_INCREMENT,
  `Navn` varchar(100) NOT NULL,
  `Beskrivelse` text DEFAULT NULL,
  `Varighet` int(11) DEFAULT NULL,
  `MedlemskapID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ProgramID`),
  KEY `MedlemskapID` (`MedlemskapID`),
  CONSTRAINT `1` FOREIGN KEY (`MedlemskapID`) REFERENCES `medlemskap` (`MedlemskapID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treningsprogrammer`
--

LOCK TABLES `treningsprogrammer` WRITE;
/*!40000 ALTER TABLE `treningsprogrammer` DISABLE KEYS */;
INSERT INTO `treningsprogrammer` VALUES
(1,'Styrke','Full kropp',30,1);
/*!40000 ALTER TABLE `treningsprogrammer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treningstimer`
--

DROP TABLE IF EXISTS `treningstimer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `treningstimer` (
  `TimeID` int(11) NOT NULL AUTO_INCREMENT,
  `ProgramID` int(11) DEFAULT NULL,
  `Dato` date NOT NULL,
  `Klokkeslett` time NOT NULL,
  `Varighet` int(11) DEFAULT NULL,
  PRIMARY KEY (`TimeID`),
  KEY `ProgramID` (`ProgramID`),
  CONSTRAINT `1` FOREIGN KEY (`ProgramID`) REFERENCES `treningsprogrammer` (`ProgramID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treningstimer`
--

LOCK TABLES `treningstimer` WRITE;
/*!40000 ALTER TABLE `treningstimer` DISABLE KEYS */;
INSERT INTO `treningstimer` VALUES
(1,1,'2025-11-28','10:00:00',60);
/*!40000 ALTER TABLE `treningstimer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'treningssenter'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-12-02 11:50:45
