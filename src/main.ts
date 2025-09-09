// src/main.ts
import * as core from '@actions/core'
import * as github from '@actions/github'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Get the inputs from the workflow file
    const adjectivesInput = core.getInput('adjectives')
    const nounsInput = core.getInput('nouns')

    // Split the comma-separated strings into arrays
    const adjectives = adjectivesInput.split(',')
    const nouns = nounsInput.split(',')

    // Select a random adjective and noun
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]

    // Combine them to create the codename
    const codename = `${randomAdjective} ${randomNoun}`
    core.setOutput('codename', codename) // Make the codename available to other steps

    // --- Post the codename as a comment on the PR ---

    // Get the GitHub token from the runner
    const githubToken = core.getInput('github-token', { required: true })

    // Get the context of the workflow run
    const context = github.context
    if (context.payload.pull_request == null) {
      core.setFailed('No pull request found.')
      return
    }

    // Create an authenticated Octokit client
    const octokit = github.getOctokit(githubToken)
    const prNumber = context.payload.pull_request.number

    // The comment body
    const commentBody = `🎉 Your codename for this PR is: **${codename}**`

    // Post the comment
    await octokit.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: prNumber,
      body: commentBody
    })
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}