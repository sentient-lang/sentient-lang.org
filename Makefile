PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

EXAMPLES := $(wildcard examples/*.snt)
COMPILED := $(addprefix compiled/,$(notdir $(EXAMPLES:.snt=.json)))

.PHONY: all lint compile clean

all: lint compile

lint: node_modules
	npx jshint _js

compile: node_modules $(COMPILED)

compiled/%.json: examples/%.snt
	sentient -c -o $^ > $@

node_modules:
	yarn

clean:
	rm -rf node_modules
	rm -rf compiled/*
