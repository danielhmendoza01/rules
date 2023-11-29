# ASU SHARES Rules Manager

This project is used to manage clinical decision support (CDS) rule definitions used by [ASU SHARES](https://www.asushares.com) decision systems. The hosted copy is available [here](https://rules.sandbox.asushares.com).

The project is written in TypeScript using [Angular](https://angular.io), [Bootstrap](https://getbootstrap.com/), and [SCSS](http://sass-lang.com) for custom CSS. `npm` is the package manager.


# Building for Production

To build a reusable image with [Docker](https://www.docker.com) and [nginx](http://nginx.org), use the included Dockerfile. For example:

```sh
	docker build -t asushares/rules:latest . # though you probably want your own repo and tag strings :)

	# or cross-platform
	docker buildx build --platform linux/arm64/v8,linux/amd64 -t asushares/rules:latest . --push
```

## Running a Pre-Built Image

On your local machine or container hosting environment:

```sh
	docker run -d -p 4200:80 --restart unless-stopped -e "CONSENT_BUILDER_DEFAULT_FHIR_URL=http://localhost:3000" asushares/rules:latest # or any official tag
```


# Attribution

Preston Lee

# License

Apache 2.0
