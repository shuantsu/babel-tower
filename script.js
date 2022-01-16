$(function(){

	var esperar = false,
		sempre_mover_last_state = false,
		quadrados_resolvidos = $('.quadrado');
	
	function swap(el1, el2) {
		var _el1, el1_before = $(el1).prev();
			
			_el1 = el1.remove();
			
			el2.after(_el1);
			
			_el2 = el2.remove();
			
			el1_before.after(_el2);
			
	}

	function swipe(row, direction, atropelar) {
	
		var $row = $('.row_' + row),
			$espacos = $row.find('.espaco'),
			$quadrados = $row.find('.quadrado'),
			$espaco_removido,
			$quadrado_removido,
			animate = $('#animate').prop('checked'),
			atropelar = atropelar || false;
		
		if (!atropelar) {
			if (esperar) {
				return
			}
		}
		
		if (direction == 'up') {
			
			if (animate) {
			
				$row.stop().animate({marginTop: '-62px'}, function(){
					$espaco_removido = $espacos.first().remove();
					$quadrado_removido = $quadrados.first().remove();
					$row.append($espaco_removido).append($quadrado_removido);
					$row.css({marginTop: 0});
				});
			
			} else {
				$espaco_removido = $espacos.first().remove();
				$quadrado_removido = $quadrados.first().remove();
				$row.append($espaco_removido).append($quadrado_removido);
			}
			
		}
		
		if (direction == 'down') {
		
			if (animate) {
				$row.css({marginTop: '-62px'});
			}
			$espaco_removido = $espacos.last().remove();
			$quadrado_removido = $quadrados.last().remove();
			$row.prepend($quadrado_removido).prepend($espaco_removido);
			if (animate) {
				$row.stop().animate({marginTop: '0px'});
			}
			
		}
		
		if (animate) {
			esperar = true;
			setTimeout(function (){esperar = false}, 410);
		}
		
	}
	
	function vazio() {
		return $('[class^=row]').find('.vazio');
	}
	
	function colVazio() {
		return $('[class^=row]').has('.vazio');
	}
	
	function shake() {
		$('.babel').effect('shake');
	}
	
	function moverQuadrado(direcao) {
	
		var $vazio = vazio(),
			vazio_index = $vazio.index();
			col = colVazio().attr('class'),
			leftmost = $('.row_left div').eq(vazio_index),
			center = $('.row_center div').eq(vazio_index),
			rightmost = $('.row_right div').eq(vazio_index),
			animate = $('#animate').prop('checked'),
			sempre_mover = $('#sempre_mover').prop('checked');

		if (esperar) {
			return;
		}
			
		if (vazio_index <= 5 || sempre_mover) {
			
			if (direcao == 'esquerda') {
			
				if (col == 'row_left') {
					if (animate) {
						center.css('position','relative').animate({marginLeft: '-86px'}, function(){
							swap(center, $('.' + col + ' .vazio'));
							center.css({position: 'static', marginLeft: 0})
						});
					} else {
						swap(center, $('.' + col + ' .vazio'));
					}
				}
				
				if (col == 'row_center') {
					if (animate) {
						rightmost.css('position','relative').animate({marginLeft: '-86px'}, function(){
							swap(rightmost, $('.' + col + ' .vazio'));
							rightmost.css({position: 'static', marginLeft: 0})
						});
					} else {
						swap(rightmost, $('.' + col + ' .vazio'));
					}
				}
				
				if (col == 'row_right') {
					shake();
				}
				
			}
			
			if (direcao == 'direita') {
			
				if (col == 'row_right') {
					if (animate) {
						center.css('position','relative').animate({left: '86px'}, function(){
							swap(center, $('.' + col + ' .vazio'));
							center.css({position: 'static', left: 0})
						});
					} else {
						swap(center, $('.' + col + ' .vazio'));
					}
				}
				
				if (col == 'row_center') {
					if (animate) {
						leftmost.css('position','relative').animate({left: '86px'}, function(){
							swap(leftmost, $('.' + col + ' .vazio'));
							leftmost.css({position: 'static', left: 0})
						});
					} else {
						swap(leftmost, $('.' + col + ' .vazio'));
					}
				}
				
				if (col == 'row_left') {
					shake();
				}
				
			}
			
			if (animate) {
				esperar = true;
				setTimeout(function (){esperar = false}, 410);
			}
			
		} else {
			shake();
			return;
		}
	}
	
	function embaralharArray(array) {
		var indice_atual = array.length, valor_temporario, indice_aleatorio;
	 
		while (0 !== indice_atual) {
	 
			indice_aleatorio = Math.floor(Math.random() * indice_atual);
			indice_atual -= 1;
	 
			valor_temporario = array[indice_atual];
			array[indice_atual] = array[indice_aleatorio];
			array[indice_aleatorio] = valor_temporario;
		}
	 
		return array;
	}
	
	function resolver() {
		$('.quadrado').remove();
		$('.espaco').each(function(i, v){
			$(v).after(quadrados_resolvidos[i]);
		});
	}
	
	function embaralhar() {
		
		var quadrados = $('.quadrado').remove();
		embaralharArray(quadrados);
		
		$('.espaco').each(function(i, v){
			$(v).after(quadrados[i]);
		});
		
	}
	
	$("#dir_cima").click(function(){
		swipe('right', 'up');
	});
	
	$("#dir_baixo").click(function(){
		swipe('right', 'down');
	});
	
	$("#cen_cima").click(function(){
		swipe('center', 'up');
	});
	
	$("#cen_baixo").click(function(){
		swipe('center', 'down');
	});
	
	$("#esq_cima").click(function(){
		swipe('left', 'up');
	});
	
	$("#esq_baixo").click(function(){
		swipe('left', 'down');
	});
	
	$('#direita').click(function(){
		moverQuadrado("direita");
	});
	
	$('#esquerda').click(function(){
		moverQuadrado("esquerda");
	});
	
	$("#virar_baixo").click(function() {
		swipe('right', 'down', true);
		swipe('center', 'down', true);
		swipe('left', 'down', true);
	});
	
	$("#virar_cima").click(function() {
		swipe('right', 'up', true);
		swipe('center', 'up', true);
		swipe('left', 'up', true);
	});
	
	$('body').keydown(function(e){
		switch (e.keyCode) {
			case 37:
				$("#esquerda").click();
				break;
			case 39:
				$("#direita").click();
				break;
			case 67:
				$("#dir_baixo").click();
				break;
			case 68:
				$("#dir_cima").click();
				break;
			case 88:
				$("#cen_baixo").click();
				break;
			case 83:
				$("#cen_cima").click();
				break;
			case 90:
				$("#esq_baixo").click();
				break;
			case 65:
				$("#esq_cima").click();
				break;
			case 70:
				$("#virar_cima").click();
				break;
			case 86:
				$("#virar_baixo").click();
				break;
			case 79:
				$("#embaralhar").click();
				break;
			case 80:
				$("#resolver").click();
				break;
				
				
		}
	});
	
	$("#godmode").click(function(){
		if ($(this).prop('checked')) {
			$('.babel').stop().animate({height: '384px'});
			sempre_mover_last_state = $('#sempre_mover').prop('checked');
			$('#sempre_mover').attr('disabled', true).prop('checked', true);
		} else {
			$('.babel').stop().animate({height: '197px'});
			$('#sempre_mover').attr('disabled', false).prop('checked', sempre_mover_last_state);
		}
	});
	
	$('#embaralhar').click(embaralhar);
	
	$("#resolver").click(resolver);
	
});