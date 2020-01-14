--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: shoes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.shoes (
    id integer NOT NULL,
    name character varying(64),
    added date
);


ALTER TABLE public.shoes OWNER TO admin;

--
-- Name: shoes_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.shoes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shoes_id_seq OWNER TO admin;

--
-- Name: shoes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.shoes_id_seq OWNED BY public.shoes.id;


--
-- Name: true_size_data; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.true_size_data (
    id integer NOT NULL,
    shoe_id integer,
    value numeric,
    added date
);


ALTER TABLE public.true_size_data OWNER TO admin;

--
-- Name: true_fit_data_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.true_fit_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.true_fit_data_id_seq OWNER TO admin;

--
-- Name: true_fit_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.true_fit_data_id_seq OWNED BY public.true_size_data.id;


--
-- Name: shoes id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.shoes ALTER COLUMN id SET DEFAULT nextval('public.shoes_id_seq'::regclass);


--
-- Name: true_size_data id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.true_size_data ALTER COLUMN id SET DEFAULT nextval('public.true_fit_data_id_seq'::regclass);


--
-- Data for Name: shoes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.shoes (id, name, added) FROM stdin;
1	Addidas	2020-01-13
2	Nike	2020-01-13
3	Reebok	2020-01-13
\.


--
-- Data for Name: true_size_data; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.true_size_data (id, shoe_id, value, added) FROM stdin;
1	1	3	2020-01-13
5	1	2	2020-01-13
6	2	5	2020-01-13
7	2	5	2020-01-13
8	2	4	2020-01-13
14	3	3	2020-01-13
24	1	1	2020-01-14
25	1	1	2020-01-14
28	2	1	2020-01-14
29	2	1	2020-01-14
\.


--
-- Name: shoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.shoes_id_seq', 1, false);


--
-- Name: true_fit_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.true_fit_data_id_seq', 29, true);


--
-- Name: shoes shoes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.shoes
    ADD CONSTRAINT shoes_pkey PRIMARY KEY (id);


--
-- Name: true_size_data true_fit_data_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.true_size_data
    ADD CONSTRAINT true_fit_data_pkey PRIMARY KEY (id);


--
-- Name: true_size_data true_fit_data_shoe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.true_size_data
    ADD CONSTRAINT true_fit_data_shoe_id_fkey FOREIGN KEY (shoe_id) REFERENCES public.shoes(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

