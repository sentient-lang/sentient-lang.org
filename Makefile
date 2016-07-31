PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

lint: node_modules
	jshint _js

node_modules:
	npm install
