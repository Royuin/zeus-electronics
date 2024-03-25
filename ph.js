else {
      const graphicsCardExists = await GraphicsCard.findOne({name: req.body.name}).exec();
      if (graphicsCardExists) {
        res.render('graphics_card_form', => {
          title: 'Create a new graphics card',
          graphics_card_exists: graphicsCardExists,
          url: graphicsCardExists.url,
        });
        return;
      }
    }

===undefined ? '' : 'name'
