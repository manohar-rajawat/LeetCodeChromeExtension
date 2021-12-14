let color = '#3aa757';
let solvedProblems = []

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ solvedProblems});
  console.log('Solved Problems are', `solvedProblems: ${solvedProblems}`);
});