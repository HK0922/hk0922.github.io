# Publish on GitHub Pages

This package targets the user site **https://hk0922.github.io/**. Use the exact repository name **hk0922.github.io** under the **HK0922** account. A repository named only `Portfolio` would be a different project-site configuration.

The source is ready. You will perform the repository upload and publication. The included workflow uses Node.js 24, installs the lockfile, runs tests, builds Astro, checks links and metadata, verifies the portable export, and uploads only `dist/` for deployment.

## 1. Create the repository

On GitHub, create a **public** repository:

| Setting | Value |
| --- | --- |
| Owner | HK0922 |
| Name | hk0922.github.io |
| Description | Personal portfolio: AI engineering, software projects, and music. |
| Add README | On, to create the initial main branch |
| Add .gitignore | None; the package supplies one |

If that repository already exists, reuse it. These instructions assume it is the intended portfolio repository; do not replace another site's source accidentally.

## 2. Enable Pages

Open the repository's **Settings → Pages**. Under **Build and deployment → Source**, select **GitHub Actions**. The package already supplies the workflow; no additional template is needed.

## 3. Upload with GitHub Desktop

1. Clone the new repository with [GitHub Desktop](https://desktop.github.com/).
2. Open its local folder. Copy the **contents** of the extracted `HK_Portfolio_Remake` folder into it. Replace the initial README with the supplied README.
3. Include `.github/`, `.gitignore`, and `.nvmrc`. On macOS, `Command + Shift + .` shows hidden files in Finder; on Windows use the File Explorer hidden-items view.
4. Check that `package.json` and `astro.config.mjs` are at the repository root, with `.github/workflows/deploy.yml` beneath it. Do not put everything inside an extra `HK_Portfolio_Remake/` subfolder.
5. Commit the changes in GitHub Desktop, then push them to `main`.

The supplied `.gitignore` excludes dependency folders, build output, the portable preview, local hosting metadata, and generated bundles. Their absence from the commit is expected. The workflow recreates the build from source.

### Terminal alternative

If you prefer Git, clone the repository that you created in step 1:

```bash
git clone https://github.com/HK0922/hk0922.github.io.git
cd hk0922.github.io
```

Copy the extracted package's contents into that cloned folder, including the files mentioned above. Then:

```bash
git add .
git status
git commit -m "Publish personal portfolio"
git push origin main
```

Authenticate with your normal GitHub setup when prompted. A personal access token does not belong in any portfolio source file or workflow. No custom secret is required by the supplied workflow.

## 4. Wait for the deployment

Open **Actions → Build and deploy portfolio**. The run has two jobs: **Build and verify**, then **Publish to GitHub Pages**. Once both succeed, use the deployment URL or **Settings → Pages → Visit site**.

Your intended public address is:

**https://hk0922.github.io/**

If the first run happened before Pages was enabled, select the workflow's **Run workflow** control and run it on `main` after step 2. Updates to `main` trigger subsequent builds automatically. Pull requests run checks without deploying.

## 5. Check the live site

- Open both project pages directly and refresh them.
- Switch day/night, scroll down and up, and reload for the loading animation.
- Check a phone-width layout and keyboard navigation.
- Download the résumé and play the keyboard clip intentionally.
- Open a nonexistent path to confirm the custom 404 page appears.

Local build, logic, asset and export checks passed. The actual GitHub Actions deployment has not run yet, and browser rendering/playback was not verified in the authoring environment.

## Updating your site

Edit the appropriate file listed in [MAINTENANCE.md](MAINTENANCE.md), commit it, and push to `main`. The workflow validates and publishes the new version. You do not upload a fresh ZIP or manually commit `dist/` for each update.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| No workflow appears | Confirm `.github/workflows/deploy.yml` exists at the repository root and was pushed to `main`. |
| The README appears instead of the portfolio | Pages Source must be GitHub Actions. Wait for the supplied deployment workflow to succeed. |
| Pages reports it is not enabled | Select GitHub Actions under Settings → Pages, then run the workflow again. |
| Build cannot find package.json | Move the package contents to the repository root, removing the extra wrapper folder. |
| Styles or pages return 404 | Use `hk0922.github.io` as the repository name. This release targets the account-root site, not a `/Portfolio/` subpath. |
| A job fails | Open that job's first failed step in Actions. The site is not redeployed until the checks and build succeed. |
| Old content remains | Confirm the latest run is green and refresh without the browser cache. |
| CareContext opens a profile | Add its exact published repository URL in `src/data/projects.mjs`, then rebuild/push. |

## Official references

Checked November 4, 2026:

- [Create a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Choose the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Custom GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Astro deployment to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Checkout action](https://github.com/actions/checkout), [Node setup](https://github.com/actions/setup-node), [Pages configuration](https://github.com/actions/configure-pages), [artifact upload](https://github.com/actions/upload-pages-artifact), and [deployment](https://github.com/actions/deploy-pages)

The workflow uses verified available action tags: checkout v7, setup-node v7, configure-pages v6, upload-pages-artifact v4, and deploy-pages v5. Native GitHub-hosted execution remains to be confirmed by your first run.
