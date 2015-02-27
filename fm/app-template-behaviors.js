// JavaScript Document

/*
 *
 *
 *
 * Create Focus Management Bindings 
 *
 *
 *
 */



function assignFocusManagement(elementsList, eventType, keyName, direction)
{
	$(elementsList).each(function()
	{
		if(typeof keyName != 'undefined') // best method of figuring out if there is a passed variable or not
		{
			$(this).bind(eventType, keyName, function(event)
			{
				preventEvents(event);
				var target;
				var targetIndex = $(elementsList).index(this);
				
				if(targetIndex -1 > 0 && targetIndex +1 > elementsList.length)
				{
					targetIndex = undefined;
					console.log('end of query: value = ' + targetIndex);
				}
				
				runFocusBehavior();
				
				
				
				function runFocusBehavior()
				{
					if(direction == 'ascending')
					{
						if(targetIndex !== 0)
						{
							targetIndex--;
							target = elementsList[targetIndex];
						}
					}
					else if(direction == 'descending')
					{
						if(targetIndex !== -1)
						{
							targetIndex++;
							target = elementsList[targetIndex];
						}
					}
					else
					{
						// do nothing
					}
				}
				
				if(target !== undefined) 		{	target.focus();}
				else if(target == undefined)	{	console.log('target element undefined');}
				
			});
		}
	});
}



/*
 *
 *
 *
 * Reach Catch Directions from CSS, perform bindings 
 *
 *
 *
 */
 
bindFocusCatchDirections();


function bindFocusCatchDirections()
{
	$('input.toggle-mode[type="text"]').bind('focus', function()
	{
		toggleMode(this);
	});
	
	
	
}



/*
 *
 *
 *
 * Activate App Mode Toggling Behavior (JAWS only) 
 *
 *
 *
 */
 
 
function toggleMode(triggerElement, event)
{
	//	preventEvents(event);
	
	var classAttr = $(triggerElement).attr('class').split(' ');
	// 	find appmode-act/deact
	var appmodePattern = /^appmode\-([\w-]+)/; // ^appmode\-\w+
	var appmodeValue = null;
	var appmodeSubstr = null;
	var targetidPattern = /^targetid\-([\w-]+)/;
	var targetidValue = null;
	var targetidSubstr = null;
	
	/* extract all parameters for catch from class attr values */
	for(var x=0;x<classAttr.length;x++) 
	{
		if(appmodeValue == null)
		{
			appmodeValue = appmodePattern.exec(classAttr[x]);
			if(appmodeValue != null)
			{
				appmodeSubstr = appmodeValue[1];
			}
		}
		if(targetidValue == null)
		{
			targetidValue = targetidPattern.exec(classAttr[x]);
			if(targetidValue != null)
			{
				targetidSubstr = targetidValue[1];
			}
		}
	}
	
	if(appmodeSubstr == "act") // NOTE: nvda doesn't use body for role=application
	{
		$('body').attr('role', 'application');
		//runXen();
		
		var targetFinal = $('#' + targetidSubstr);
		targetFinal.focus();
		//	preventEvents(event);
		
		//deleteXen();
	}
	else if(appmodeSubstr == "deact") // || $('body').hasClass('nvda'))
	{
		$('body').removeAttr('role');
		//runXen();
		
		if($('#ie8-solution').hasClass('true') == true)
		{
			$('#toggle-iframe').focus();
		}
		
		var targetFinal = $('#' + targetidSubstr);
		targetFinal.focus();
		
	}
	
	
	
}
 
 
 /*
  *
  *
  *
  *	Utilities
  *
  *
  *
  */
 
 
$('[tabindex]:not(.focus)').focus(function()
{
	$('[tabindex].focus').removeClass('focus');
	$(this).addClass('focus');
});
 
  
function preventEvents(event)
{
	event.preventDefault(); 
	event.stopPropagation();
	event.stopImmediatePropagation();
}

$('.exit-fix').each(function()
{
	exitFix(this);
});

// temporary toggle
$('#ie8-solution').click(function()
{
	$(this).toggleClass('true');
});


function exitFix(exitFixElement)
{
	var self = $(exitFixElement);
	//self.bind('keydown', function()
	//{
		var classAttr = $(self).attr('class').split(' ');
		var targetidPattern = /^targetid\-([\w-]+)/;
		var targetidValue = null;
		var targetidSubstr = null;
		
		
		for(var x=0;x<classAttr.length;x++) 
		{
			
			if(targetidValue == null)
			{
				targetidValue = targetidPattern.exec(classAttr[x]);
				if(targetidValue != null)
				{
					targetidSubstr = targetidValue[1];
				}
			}
		}
		
		var targetFinal = $('#' + targetidSubstr);
		
		if(targetFinal.length != 0)
		{
			targetFinal.focus();
		}
		
		
	//});
}
