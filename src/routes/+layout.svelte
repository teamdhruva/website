<script>
  import { fly } from "svelte/transition";
  import "../app.css";

  let visible = false;
</script>

<svelte:head>
  <title>dhRuVa</title>

  <script src="resp.js"></script>
</svelte:head>

<div class="flex flex-col min-h-screen">
	
  
	<slot />
  </div>

<div class="navbar">
	<div class="logo">
		dhRuVa
	</div>
	<ul class="nav-links">
	  <li><a href="#">Home</a></li>
	  <li><a href="#Projects">Projects</a></li>
	  <li><a href="#">Team</a></li>
	  <li><a href="#About us">About Us</a></li>
	  <li><a href="#Contact Us">Contact</a></li>
	  

	</ul>
  </div>

  <style>
    /* Add CSS styles here */
    .navbar {
      /*background-color: rgba(255, 255, 255, 0.9); /* Translucent white background */
      background-color: transparent;
      border: 2px solid rgba(250, 250, 250);
      backdrop-filter: blur(10px); 
      position: fixed;
      top: 50px; 
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 40px); 
      max-width: 1200px; 
      padding: 15px;
      border-radius: 7px; 
      z-index: 1000; 
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25); 
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: white; 
  
    }
    
    .nav-links {
      list-style-type: none;
      margin: 0;
      padding: 10px;
      display: flex;
    }
    
    .nav-links li {
      margin-right: 15px;
      
      
    }
    
    .nav-links li a {
      text-decoration: none;
      font-size: 1rem;
      font-weight: bold;
      color:white; 
      transition: color 0.3s ease;
      padding-left: 20px;
    }
    
    .nav-links li a:hover {
      color:#00bfff; 
    }
  
    .Img{
      width:50px;
      height:50px;
    }
  
  
    
    </style>
