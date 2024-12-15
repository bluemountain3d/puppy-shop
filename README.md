# Puppy Shop - A Webshop for Furry Puppies
## About the Project
Puppy Shop is a fictional webshop for puppies, developed as a school project. The website is a fully functional e-commerce platform (in Swedish) where customers can browse, sort, and purchase puppies from 20 different breeds. Each breed is offered with a choice between male and female puppies.

## Demo & Screenshots
### Live Demo
🔗 [Visit Puppy Shop](https://bluemountain3d.github.io/puppy-shop/src/)

### Screenshots
#### Landing View
![Landing View](./design/puppy-shop-landing-view.png)

#### Product Overview
![Product Overview](./design/puppy-shop-products-section.png)

#### Cart Overlay
![Cart Dropdown](./design/puppy-shop-cart-dropdown.png)

#### Cart & Checkout
<details>
<summary>View checkout steps (6 images)</summary>
##### Checkout Overview
![Checkout - Customer Info](./design/puppy-shop-checkout-section-1.png)

##### Detailed Steps:
1. ![Newsletter](./design/email-zip-newsletter.png)
2. ![Shipping Options](./design/shipping-choices.png)
3. ![Customer Information](./design/customer-information.png)
4. ![Order Details](./design/order-details.png)
5. ![Payment Selection](./design/payment-selection.png)
</details>

#### Order Confirmation
![Order Confirmation](./design/puppy-shop-order-confirmation.png)

### Responsive Design
<details>
<summary><strong>Tablet View</strong> <i>(12 images)</i></summary>

#### Landing section
![Tablet - Landing](./design/tablet-landing-wiew.png)

#### Products section
![Tablet - Products](./design/tablet-products-section.png)

#### Cart overlay
![Tablet - Cart overlay](./design/tablet-cart-dropdown.png)

#### Checkout
![Tablet - Checkout](./design/tablet-checkout-section.png)

##### Detailed Steps:
1. ![Pre info. and newsletter](./design/tablet-checkout-start.png)
2. ![Shipping Choices](./design/tablet-checkout-shipping-choices.png)
3. ![Customer Information](./design/tablet-checkout-customer-information.png)
4. ![Order Details](./design/tablet-checkout-order-details.png)
5. ![Card Payment](./design/tablet-checkout-card-payment.png)
6. ![Invoice Payment](./design/tablet-checkout-invoice-payment.png)
7. ![GDPR & Pay Button](./design/tablet-checkout-gdpr-activated-pay.png)

#### Order Confirmation
![Tablet - Checkout](./design/tablet-order-confirmation.png)

</details>

<details>
<summary><strong>Mobile View</strong> <i>(4 images)</i></summary>

#### Landing section
![Mobile - Landing](./design/mobile-landing-wiew.png)

#### Products section
![Mobile - Products](./design/mobile-products-section.png)

#### Checkout
![Mobile - Cart](./design/mobile-checkout-cart.png)

*Note: Checkout process screens are identical to tablet view except for viewport width adjustments*

#### Order Confirmation
![Mobile - Checkout](./design/mobile-order-confirmation.png)

</details>

## Main Features
### Product Display & Sorting
- 20 different dog breeds with choice of male/female
- Sorting options:

  | Option   | Sort Order Available |
  |----------|----------------------|
  | Breed    | Ascending/Descending (A-Z/Z-A) |
  | Price    | Ascending/Descending (Low-High/High-Low) |
  | Rating   | Ascending/Descending (1-5/5-1) |
  | Category | Dog type grouping (separate combobox) |

### Dynamic Pricing & Discounts
| Type | Discount/Surcharge | Condition |
|------|--------------------|-----------|
| Monday Discount | 10% off | Before 10:00 AM, notofication |
| Weekend Surcharge | 15% extra | Friday 15:00 - Monday 03:00 |
| Bulk Discount | 10% off | 10+ puppies of same breed and gender|
| Cart Discount | 10% off subtotal | 16+ puppies in cart |

markdownCopy### Shipping
| Carrier | Fixed Cost (SEK) | Variable Cost (%) | Swedish Name |
|---------|------------------|-------------------|--------------|
| Stork | 250 | 4% | Stork |
| Dove | 150 | 3% | Duva |
| Hare | 75 | 2% | Hare |
| Snail | 25 | 1% | Snigel |

**Free shipping on orders of more than 15 puppies*

**Variable cost is calculated as percentage of cart subtotal*

### Order Process
| Section | Description |
|---------|-------------|
| Products (Produkter) | Browse and add products to cart |
| Checkout (Kassa) | Customer details and payment options |
| Order Confirmation (Orderbekräftelse) | Purchase summary and delivery details |

| Process Rules | Description |
|--------------|-------------|
| Cart Timer | Cart automatically clears 15 minutes from page load |
| Payment Restriction | Invoice option disabled for orders over 80,000 SEK |

## Technical Specifications
### Accessibility
- Full keyboard support, visitor can finish the order using keyboard only
- WCAG-compliant color contrast
- Clear error handling and validation, messages and colors
- Responsive design for mobile, tablet & desktop

### Performance
#### Lighthouse Scores
- Local Development (Live Server)
    - Performance: 89
    - Accessibility: 100
    - Best Practices: 100
    - SEO: 100

- Production (GitHub Pages)
    - Performance: 100
    - Accessibility: 100
    - Best Practices: 100
    - SEO: 100
    
    ![Lighthouse Scores](./design/lighthouse-scores.png)
    
    ![Key Performance Metrics](./design/performance-metrics.png)
  
- W3C HTML validation
  
  ![HTML Validation report](./design/html-validation.png)

### Validation & Form Handling
- Comprehensive validation of all customer details
- Special validation of Swedish personal ID number for invoice payment
- Dynamic activation of order button

## Installation & Development
1. Clone the repo: `git clone https://github.com/Medieinstitutet/fed24d-js-intro-inl-1-webshop-bluemountain3d)`
2. Open index.html in any web browser

## Project Structure
```text
project/src/
│
├── index.html
├── css/
│   └── style.min.css
├── js/
│   ├── modules/
│   └── main.js
├── scss/
│   ├── abstracts/     # Functions, mixins, variables
│   ├── vendors/       # Third-party styles
│   ├── utilities/     # Helper classes
│   ├── themes/        # Theme settings
│   ├── base/          # Base elements
│   ├── components/    # Reusable components
│   ├── layout/        # Layout sections
│   ├── pages/         # Page-specific styles
│   └── style.scss     # Main SCSS file
├── fonts/
└── img/
    ├── icons/
    └── puppies/

```

## Technologies
[![Technologies](https://skillicons.dev/icons?i=html,svg,css,sass,js,vscode,git,github,figma,)](https://skillicons.dev)

- HTML5
- CSS3/SASS
- Vanilla JavaScript
- VS Code
- Git & GitHub
- Figma

### SASS Architecture
The project uses a modular SASS architecture with:
- **Abstracts**: Reusable functions, mixins, and variables
- **Vendors**: Third-party stylesheets
- **Utilities**: Helper classes and reset styles
- **Themes**: Theme-specific styles
- **Base**: Base element styles
- **Components**: Reusable component styles
- **Layout**: Layout-specific styles
- **Pages**: Page-specific styles

This structure ensures maintainability and scalability of the CSS codebase.

### SVG Implementation
SVGs are efficiently implemented directly in the HTML using the symbol pattern:
```html
<!-- At the start of the body -->
<svg class="svg" role="none" xmlns="http://www.w3.org/2000/svg">

    <symbol id="cart-icon" viewBox="0 0 48 48">
        <!-- SVG path data -->
    </symbol>

    <symbol id="close-icon" viewBox="0 0 48 48">
        <!-- SVG path data -->
    </symbol>

    <!-- More symbols or Clip Paths -->
</svg>

<!-- Usage throughout the document -->
<svg>
    <use href="#cart-icon"/>
</svg>
```

## Learning Outcomes & Future Development
### Key Learnings
- **JavaScript Fundamentals:** Deepened understanding of DOM manipulation, event handling, and working with timers
- **Form Validation:** Implemented basic pattern validation for input fields including Swedish personal ID format
- **SASS Architecture:** Successfully organized a large CSS codebase using the 7-1 pattern
- **SVG Implementation:** Learned efficient SVG management using the symbol pattern
- **Accessibility:** Gained more practical experience in implementing WCAG guidelines and keyboard navigation. Also got a deeper understanding of ARIA attributes, their purpose, and appropriate implementation contexts
- **UI/UX Design:** Successfully implemented dark mode and interactive animations for better user feedback
- **Time Management:** Balanced feature development with project deadlines while maintaining code quality

### Areas for Future Development
#### Technical Enhancements
- Implement user authentication and accounts
- Add a wishlist feature
- Integrate with a backend API
- Add unit tests for critical functions
- Implement a product review system
- Add local storage for cart persistence

#### UX Improvements
- Add product filtering by multiple criteria
- Implement an advanced search feature
- Add animations for smoother interactions
- Enhance mobile experience with touch gestures

#### Performance Optimization


## Developer
**Name**: Egil Eskilsson  
**Phone**: +46 70-585 82 83  
**Email**: egil@egileskilsson.se

## License
This project was created as a school assignment and is not intended for commercial use.
