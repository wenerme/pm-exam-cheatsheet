fmt:
	npx prettier -w src --loglevel warn
fix:
	npx eslint src --fix --ext .ts,.tsx
verify:
	npx tsc --noEmit
lint:
	npx eslint src --ext .ts,.tsx

ci-build:
	npm ci --prefer-offline --no-audit
	npm run build
