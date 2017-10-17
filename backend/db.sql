 CREATE TABLE public.users
	(
	    id "serial" NOT NULL UNIQUE,
	    user_id varchar(200) NOT NULL UNIQUE,
		created_at timestamp with time zone NOT NULL DEFAULT NOW(),
	    PRIMARY KEY (id)
	)
	WITH (
	    OIDS = FALSE
	);

	ALTER TABLE public.users
	    OWNER to root;
	COMMENT ON TABLE public.users
	    IS 'users table';

CREATE TABLE public.phones
	(
	    id "serial" NOT NULL UNIQUE,
	    phone varchar(200) NOT NULL UNIQUE,
	    PRIMARY KEY (id)
	)
	WITH (
	    OIDS = FALSE
	);

	ALTER TABLE public.phones
	    OWNER to root;
	COMMENT ON TABLE public.phones
	    IS 'phones table';