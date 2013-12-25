-- phpMyAdmin SQL Dump
-- version 3.4.10.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2013 年 12 月 25 日 07:38
-- 服务器版本: 5.5.20
-- PHP 版本: 5.3.10

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
-- 表的结构 `i_article`
--

CREATE TABLE IF NOT EXISTS `i_article` (
  `articleid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `categoryid` int(11) unsigned NOT NULL,
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
  `writer` varchar(100) NOT NULL,
  `from` varchar(100) NOT NULL,
  `click` int(11) DEFAULT NULL,
  `isdeleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`articleid`),
  KEY `categoryid` (`categoryid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `i_article`
--

INSERT INTO `i_article` (`articleid`, `categoryid`, `title`, `pic`, `keyword`, `description`, `time`, `commentnum`, `isrecommend`, `istop`, `attachmentnum`, `userid`, `writer`, `from`, `click`, `isdeleted`) VALUES
(1, 6, '木木s木木木木幽幽幽幽幽幽幽幽幽幽幽幽幽幽', '', '奎土土ffd', '土土土', '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '木木木木木木', '月月月月月月月', 0, 0),
(2, 1, '木木s', '', '奎土土ffd', '土土土', '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '木木木木木木', '月月月月月月月', 0, 0),
(3, 5, 'dasfdfffffffffffff', '', '幽幽幽幽幽幽幽幽幽幽幽幽白白白白白白', '已已已', '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '已已已已已', '已已', 0, 1),
(4, 1, 'ffffffffff', '', 'sssssssss', 'aaaaaaaa', '2013-12-25 10:10:56', 0, 0, 1, 0, 0, 'dddddw', 'wwwwwwwwwwwwwr', 0, 0),
(5, 5, 'llllllllllllllllllllllllluuuuuuu', '', 'uuuuuuuuuuuuu', 'uttttttttttttttt', '0000-00-00 00:00:00', 0, 0, 0, 0, 0, 'yy', 'y777777777777', 0, 0),
(6, 5, 'eeeeeeeeeeeee', '', 'e222222222hhhhhhhhhhhhhhtttttt', '224444444444', '2013-12-25 10:11:56', 0, 1, 0, 0, 0, '443', 'hhhhhhhh', 0, 0),
(7, 1, '木木s木木木木ssaa幽w2222', '', '奎土土ffd', '土土土', '0000-00-00 00:00:00', 0, 1, 0, 0, 0, '木木木木木木', '月月月月ss', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `i_article_attachment`
--

CREATE TABLE IF NOT EXISTS `i_article_attachment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `articleid` int(11) unsigned DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `src` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `artical_attachment` (`articleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `i_article_comment`
--

CREATE TABLE IF NOT EXISTS `i_article_comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `articleid` int(11) unsigned DEFAULT NULL,
  `pid` int(11) unsigned DEFAULT NULL,
  `userid` int(11) unsigned DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`),
  KEY `artical_comment` (`id`,`articleid`,`pid`,`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `i_article_info`
--

CREATE TABLE IF NOT EXISTS `i_article_info` (
  `articleid` int(11) unsigned NOT NULL DEFAULT '0',
  `content` text,
  PRIMARY KEY (`articleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `i_article_info`
--

INSERT INTO `i_article_info` (`articleid`, `content`) VALUES
(1, '众人众人众人众人众人众人众人众人众人众人众人众人众人众人众人众人'),
(2, '众人众人众人众人众人众人众人众人众人众人众人众人众人众人众人众人'),
(3, '之之之之之之之初痒痒痒痒痒痒'),
(4, 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr\r\ndsadasd'),
(5, 'r53245234654654'),
(6, 'ffffffffffffffffffffffffbnbbbbbbcvvvvvvvvvvvvvvvvv'),
(7, '众人众人wwwwwwwwwwwwww1dddddddddddd众人众人众人');

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
-- 表的结构 `log_article`
--

CREATE TABLE IF NOT EXISTS `log_article` (
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
  `typeid` int(11) DEFAULT NULL COMMENT '对应s_type表里面的typeid，代表栏目所属频道',
  `pic` varchar(100) DEFAULT NULL,
  `keyword` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `pid` int(11) unsigned DEFAULT '0' COMMENT '上级栏目ID',
  `staticpath` varchar(100) DEFAULT NULL,
  `gourl` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`categoryid`),
  UNIQUE KEY `category` (`categoryid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `s_category`
--

INSERT INTO `s_category` (`categoryid`, `name`, `typeid`, `pic`, `keyword`, `description`, `pid`, `staticpath`, `gourl`) VALUES
(1, 'IM动态', 1, '', 'IM动态', 'IM动态', 0, NULL, NULL),
(3, 'ddddddddddfasdfasdf', 1, '', 'sssssss', 'dddd', 0, 'fff', 'ddddddd'),
(4, '测试栏目', 1, '', 'd测试栏目', '', 0, 'aaaaaaaaa', ''),
(5, 'fsdafasdf', 1, '', 'd', 'aaaaaaa', 3, 'afffffffff', ''),
(6, '测试测试测试', 1, '', '测试测试', '', 5, '', ''),
(7, '测大大大dd', 1, '', '测大大大dd', '测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd', 5, '', ''),
(8, '', 1, '', '', '', 5, '', '');

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

--
-- 转存表中的数据 `s_category_info`
--

INSERT INTO `s_category_info` (`categoryid`, `content`) VALUES
(1, 'IM动态'),
(3, 'aaaaa'),
(4, 'fdsc测试栏目测试栏目测试栏目测试栏目\r\n测试栏目测试栏目测试栏目'),
(5, 'sdafsdfasdf\r\nasdf\r\nas\r\ndfasdf'),
(6, '测试测试测试\r\n测试测试测试测试测试\r\n测试\r\n测试\r\n测试测试测试'),
(7, '测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd测大大大dd'),
(8, '');

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
  `t_all` tinyint(4) DEFAULT NULL COMMENT '是否覆盖所有下级栏目模板设置',
  PRIMARY KEY (`categoryid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `s_category_setting`
--

INSERT INTO `s_category_setting` (`categoryid`, `isindex`, `mshow`, `infonum`, `t_index`, `t_list`, `t_listb`, `t_listimg`, `t_content`, `t_all`) VALUES
(1, 1, 1, 25, ' 	templates/article/list_index.html', 'templates/article/list.html', 'templates/article/list_body.html', 'templates/article/list_image.html', NULL, NULL),
(3, 3, 1, 23, 'templates/article/list_index.html', 'templates/article/list.html', 'templates/article/list_body.html', 'templates/article/list_image.html', '', 0),
(4, 3, 1, 1, 'templates/article/list_index.html', 'templates/article/list.html', 'templates/article/list_body.html', 'templates/article/list_image.html', '', 0),
(5, 3, 1, 25, 'templates/article/list_index.html', 'templates/article/list.html', 'templates/article/list_body.html', 'templates/article/list_image.html', '', 0),
(6, 3, 1, 25, 'templates/article/list_index.html', 'templates/article/list.html', 'templates/article/list_body.html', 'templates/article/list_image.html', '', 0),
(7, 3, 1, 25, 'templates/article/list_index.html', 'templates/article/list.html', 'templates/article/list_body.html', 'templates/article/list_image.html', '', 0),
(8, 3, 1, 25, 'templates/article/list_index.html', 'templates/article/list.html', 'templates/article/list_body.html', 'templates/article/list_image.html', '', 0);

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
  `attachment_table` varchar(100) NOT NULL,
  PRIMARY KEY (`typeid`),
  KEY `type` (`typeid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `s_type`
--

INSERT INTO `s_type` (`typeid`, `name`, `state_table`, `info_table`, `log_table`, `comment_table`, `attachment_table`) VALUES
(1, 'article', 'i_article', 'i_article_info', 'log_article', 'i_article_comment', 'i_article_attachment');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
