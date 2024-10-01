document.addEventListener('DOMContentLoaded', () => {
    const jobListingsContainer = document.getElementById('jobListingsContainer');
    const filterListContainer = document.getElementById('filters');
    const clearButton = document.getElementById('clearButton');

    let selectedFilters = [];
  
    // Fetch job listings from the JSON file
    fetch('./data.json')
      .then(response => response.json()) // Parse JSON data
      .then(data => {
        // Store original data for filtering purposes
        const jobData = data;
        // Display all jobs initially
        displayJobListings(jobData);
      })
      .catch(error => console.error('Error fetching job listings:', error));
      
    // Function to display filtered job listings
    function displayJobListings(data) {
        jobListingsContainer.innerHTML = ''; // Clear existing listings
        data.forEach(job => createJobListing(job));
    }
    // Function to create job listings
    function createJobListing(job) {
      // Create main jobListing div
      const jobDiv = document.createElement('div');
      jobDiv.classList.add('jobListing');
      
      const logoDiv = document.createElement('div');
      logoDiv.classList.add('logo');
      // Logo image
      const logoImg = document.createElement('img');
      logoImg.classList.add("logoImage");
      logoImg.src = job.logo;
      logoImg.alt = `${job.company} Logo`;

      logoDiv.appendChild(logoImg);
  
      // Job details div
      const jobDetailsDiv = document.createElement('div');
      jobDetailsDiv.classList.add('jobDetails');
  
      // Header (Company, New, Featured)
      const header = document.createElement('div');
      header.classList.add('header');
  
      const company = document.createElement('p');
      company.classList.add('company');
      company.textContent = job.company;
  
      const newStatus = document.createElement('p');
      newStatus.classList.add('new');
      if (job.new) newStatus.textContent = "NEW!"; // Only add NEW if true
  
      const featured = document.createElement('p');
      featured.classList.add('featured');
      if (job.featured) featured.textContent = "FEATURED"; // Only add FEATURED if true
  
      header.appendChild(company);
      if (job.new) header.appendChild(newStatus); // Add new only if true
      if (job.featured) header.appendChild(featured); // Add featured only if true
  
      // Position
      const position = document.createElement('div');
      position.classList.add('position');

      const positionP = document.createElement('p');
      positionP.innerHTML = `${job.position}`;
      position.appendChild(positionP);
  
      // Categories (Role, Level, Languages, Tools)
      const categories = document.createElement('div');
      categories.classList.add('categories');
  
      const role = document.createElement('p');
      role.classList.add('role');
      role.textContent = job.role;
      role.addEventListener('click', () => handleFilterClick(job.role));
  
      const level = document.createElement('p');
      level.classList.add('level');
      level.textContent = job.level;
      level.addEventListener('click', () => handleFilterClick(job.level));

      categories.appendChild(role);
      categories.appendChild(level);
  
      // Append languages
      job.languages.forEach(language => {
        const languageP = document.createElement('p');
        languageP.classList.add('languages');
        languageP.textContent = language;
        languageP.addEventListener('click', () => handleFilterClick(language));
        categories.appendChild(languageP);
      });
  
      // Append tools
      job.tools.forEach(tool => {
        const toolP = document.createElement('p');
        toolP.classList.add('tools');
        toolP.textContent = tool;
        toolP.addEventListener('click', () => handleFilterClick(tool));
        categories.appendChild(toolP);
      });
  
      
  
      // Footer (PostedAt, Contract, Location)
      const footer = document.createElement('div');
      footer.classList.add('footer');
  
      const postedAt = document.createElement('p');
      postedAt.classList.add('postedAt');
      postedAt.textContent = job.postedAt;
  
      const contract = document.createElement('p');
      contract.classList.add('contract');
      contract.textContent = job.contract;
  
      const location = document.createElement('p');
      location.classList.add('location');
      location.textContent = job.location;
  
      footer.appendChild(postedAt);
      footer.appendChild(contract);
      footer.appendChild(location);
  
      // Append all elements to the jobDetailsDiv
      jobDetailsDiv.appendChild(header);
      jobDetailsDiv.appendChild(position);
      jobDetailsDiv.appendChild(footer);
  
      // Append logo and jobDetailsDiv to jobListing div
      jobDiv.appendChild(logoDiv);
      jobDiv.appendChild(jobDetailsDiv);
      jobDiv.appendChild(categories);
  
      // Append the jobListing to the main jobListingsContainer
      jobListingsContainer.appendChild(jobDiv);
    }

    // Function to handle filter selection
    function handleFilterClick(filter) {
        if (!selectedFilters.includes(filter)) {
            selectedFilters.push(filter);
            updateFilters();
            filterJobListings();
        }
    }

    // Function to filter job listings based on selected filters
    function filterJobListings() {
        fetch('./data.json')
          .then(response => response.json())
          .then(data => {
              const filteredJobs = data.filter(job => {
                  // Check if the job matches all selected filters
                  const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
                  return selectedFilters.every(filter => jobTags.includes(filter));
              });
              displayJobListings(filteredJobs);
          });
    }

    // Function to update the filter bar with selected filters
    function updateFilters() {
        filterListContainer.innerHTML = '';

        selectedFilters.forEach(filter => {
            const filterDiv = document.createElement('div');
            filterDiv.classList.add('filterItem');

            const filterText = document.createElement('div');
            filterText.classList.add('filterText');
            const filterTextP = document.createElement('p');
            filterTextP.innerText = filter;
            filterText.appendChild(filterTextP);
            

            const removeIcon = document.createElement('div');
            removeIcon.classList.add('removeIcon');
            const removeIconImage = document.createElement('img');
            removeIconImage.src = "./images/icon-remove.svg"
            removeIconImage.addEventListener('click', () => removeFilter(filter));
            removeIcon.appendChild(removeIconImage);

            filterDiv.appendChild(filterText);
            filterDiv.appendChild(removeIcon);
            filterListContainer.appendChild(filterDiv);
        });

            // Always append the "Clear" button after filters are rendered
        if (selectedFilters.length > 0) {
            filterListContainer.style.display = 'flex'; // Show the filter container
            clearButton.style.display = 'inline-block'; // Make sure it's visible
            filterListContainer.appendChild(clearButton); // Ensure button is always at the end
        } else {
            filterListContainer.style.display = 'none'; // Hide the entire filter container
        }
        
        applyHoverEffect();
        
    }

    // Function to remove a filter
    function removeFilter(filter) {
        selectedFilters = selectedFilters.filter(f => f !== filter);
        updateFilters();
        filterJobListings();
    }

    // Clear all filters
    clearButton.addEventListener('click', () => {
        selectedFilters = [];
        updateFilters();
        filterJobListings();
    });

    function applyHoverEffect() {
        const removeIcons = document.querySelectorAll('.removeIcon');
        removeIcons.forEach(icon => {
            icon.addEventListener('mouseover', () => {
                icon.closest('.filterItem').style.backgroundColor = 'var(--featured)';
            });

            icon.addEventListener('mouseout', () => {
                icon.closest('.filterItem').style.backgroundColor = 'var(--primary)';
            });
        });
    }

  });
  