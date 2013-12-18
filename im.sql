-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2013 年 12 月 17 日 16:59
-- 服务器版本: 5.6.12-log
-- PHP 版本: 5.4.16

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `im`
--

-- --------------------------------------------------------

--
-- 表的结构 `i_artical`
--

CREATE TABLE IF NOT EXISTS `i_artical` (
  `articalid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `pic` varchar(100) DEFAULT NULL,
  `keyword` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `commentnum` int(11) DEFAULT '0',
  `isrecommend` tinyint(1) DEFAULT '0',
  `istop` tinyint(1) DEFAULT '0',
  `attachmentnum` int(11) DEFAULT '0',
  `userid` int(11) unsigned DEFAULT NULL,
  `click` int(11) DEFAULT NULL,
  PRIMARY KEY (`articalid`),
  KEY `artical` (`articalid`,`title`,`keyword`,`description`,`time`,`isrecommend`,`istop`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `i_artical_attachment`
--

CREATE TABLE IF NOT EXISTS `i_artical_attachment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `articalid` int(11) unsigned DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `src` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `artical_attachment` (`articalid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `i_artical_comment`
--

CREATE TABLE IF NOT EXISTS `i_artical_comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `articalid` int(11) unsigned DEFAULT NULL,
  `pid` int(11) unsigned DEFAULT NULL,
  `userid` int(11) unsigned DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`),
  KEY `artical_comment` (`id`,`articalid`,`pid`,`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `i_artical_info`
--

CREATE TABLE IF NOT EXISTS `i_artical_info` (
  `articalid` int(11) unsigned NOT NULL DEFAULT '0',
  `content` text,
  PRIMARY KEY (`articalid`),
  UNIQUE KEY `artical_info` (`articalid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `i_user`
--

CREATE TABLE IF NOT EXISTS `i_user` (
  `userid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `birthyear` int(11) DEFAULT NULL,
  `birthmonth` int(11) DEFAULT NULL,
  `birthday` int(11) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  KEY `user` (`userid`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `log_artical`
--

CREATE TABLE IF NOT EXISTS `log_artical` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userid` int(11) unsigned DEFAULT NULL,
  `operation` char(50) DEFAULT NULL,
  `articalid` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `log_artical` (`userid`,`articalid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `s_admin`
--

CREATE TABLE IF NOT EXISTS `s_admin` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userid` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `admin` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `s_category`
--

CREATE TABLE IF NOT EXISTS `s_category` (
  `categoryid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `pic` varchar(100) DEFAULT NULL,
  `keyword` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `pid` int(11) unsigned DEFAULT '0' COMMENT '上级栏目ID',
  `staticpath` varchar(100) DEFAULT NULL,
  `gourl` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`categoryid`),
  UNIQUE KEY `category` (`categoryid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `s_category_info`
--

CREATE TABLE IF NOT EXISTS `s_category_info` (
  `categoryid` int(11) unsigned NOT NULL,
  `content` text,
  PRIMARY KEY (`categoryid`),
  UNIQUE KEY `category_info` (`categoryid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `s_category_setting`
--

CREATE TABLE IF NOT EXISTS `s_category_setting` (
  `categoryid` int(11) unsigned NOT NULL,
  `isindex` int(11) DEFAULT NULL COMMENT '1:栏目列表（文字） 2：栏目列表（图片）3：栏目介绍 4：自定义首页',
  `mshow` tinyint(4) DEFAULT NULL COMMENT '是否显示在导航栏',
  `infonum` int(11) DEFAULT NULL COMMENT '每页显示的信息条数',
  `t_index` varchar(100) DEFAULT NULL COMMENT '目栏自定义首页模板',
  `t_list` varchar(100) DEFAULT NULL COMMENT '栏目列表（文字）模板',
  `t_listb` varchar(100) DEFAULT NULL COMMENT '目栏介绍模板',
  `t_listimg` varchar(100) DEFAULT NULL COMMENT '目栏列表（图片）模板',
  `t_content` varchar(100) DEFAULT NULL COMMENT '目栏信息对应的模板',
  `t_all` tinyint(4) DEFAULT NULL COMMENT '是否覆盖所有下级栏目模板设置'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `s_type`
--

CREATE TABLE IF NOT EXISTS `s_type` (
  `typeid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `state_table` varchar(100) DEFAULT NULL,
  `info_table` varchar(100) DEFAULT NULL,
  `log_table` varchar(100) DEFAULT NULL,
  `comment_table` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`typeid`),
  KEY `type` (`typeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
