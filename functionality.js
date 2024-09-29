document.addEventListener('DOMContentLoaded', () => {
    const jobListingsContainer = document.getElementById('jobListingsContainer');
    const filterListContainer = document.getElementById('filters');
    const clearButton = document.getElementById('clearButton');

    let selectedFilters = [];
  
    // Fetch job listings from the JSON file
    fetch('./data.json')
      .then(response => response.json()) // Parse JSON data
      .then(data => {
        // Iterate over the jobs array and create job listings
        data.forEach(job => createJobListing(job));
      })
      .catch(error => console.error('Error fetching job listings:', error));
  
    // Function to create job listings
    function createJobListing(job) {
      // Create main jobListing div
      const jobDiv = document.createElement('div');
      jobDiv.classList.add('jobListing');
  
      // Logo image
      const logoImg = document.createElement('img');
      logoImg.classList.add('logo');
      logoImg.src = job.logo;
      logoImg.alt = `${job.company} Logo`;
  
      // Job details div
      const jobDetailsDiv = document.createElement('div');
      jobDetailsDiv.classList.add('jobDetails');
  
      // Header (Company, New, Featured)
      const headerUl = document.createElement('ul');
      headerUl.classList.add('header');
  
      const companyLi = document.createElement('li');
      companyLi.classList.add('company');
      companyLi.textContent = job.company;
  
      const newLi = document.createElement('li');
      newLi.classList.add('new');
      if (job.new) newLi.textContent = "NEW!"; // Only add NEW if true
  
      const featuredLi = document.createElement('li');
      featuredLi.classList.add('featured');
      if (job.featured) featuredLi.textContent = "FEATURED"; // Only add FEATURED if true
  
      headerUl.appendChild(companyLi);
      if (job.new) headerUl.appendChild(newLi); // Add new only if true
      if (job.featured) headerUl.appendChild(featuredLi); // Add featured only if true
  
      // Position
      const positionP = document.createElement('p');
      positionP.classList.add('position');
      positionP.innerHTML = `<br>${job.position}`;
  
      // Categories (Role, Level, Languages, Tools)
      const categoriesUl = document.createElement('ul');
      categoriesUl.classList.add('categories');
  
      const roleLi = document.createElement('li');
      roleLi.classList.add('role');
      roleLi.textContent = job.role;
  
      const levelLi = document.createElement('li');
      levelLi.classList.add('level');
      levelLi.textContent = job.level;
  
      // Append languages
      job.languages.forEach(language => {
        const languageLi = document.createElement('li');
        languageLi.classList.add('languages');
        languageLi.textContent = language;
        categoriesUl.appendChild(languageLi);
      });
  
      // Append tools
      job.tools.forEach(tool => {
        const toolLi = document.createElement('li');
        toolLi.classList.add('tools');
        toolLi.textContent = tool;
        categoriesUl.appendChild(toolLi);
      });
  
      categoriesUl.appendChild(roleLi);
      categoriesUl.appendChild(levelLi);
  
      // Footer (PostedAt, Contract, Location)
      const footerUl = document.createElement('ul');
      footerUl.classList.add('footer');
  
      const postedAtLi = document.createElement('li');
      postedAtLi.classList.add('postedAt');
      postedAtLi.textContent = job.postedAt;
  
      const contractLi = document.createElement('li');
      contractLi.classList.add('contract');
      contractLi.textContent = job.contract;
  
      const locationLi = document.createElement('li');
      locationLi.classList.add('location');
      locationLi.textContent = job.location;
  
      footerUl.appendChild(postedAtLi);
      footerUl.appendChild(contractLi);
      footerUl.appendChild(locationLi);
  
      // Append all elements to the jobDetailsDiv
      jobDetailsDiv.appendChild(headerUl);
      jobDetailsDiv.appendChild(positionP);
      jobDetailsDiv.appendChild(categoriesUl);
      jobDetailsDiv.appendChild(footerUl);
  
      // Append logo and jobDetailsDiv to jobListing div
      jobDiv.appendChild(logoImg);
      jobDiv.appendChild(jobDetailsDiv);
  
      // Append the jobListing to the main jobListingsContainer
      jobListingsContainer.appendChild(jobDiv);
    }
  });
  